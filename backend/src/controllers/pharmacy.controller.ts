import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { search, category, isActive, lowStock } = req.query;

    const where: Prisma.MedicineWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { genericName: { contains: search as string, mode: 'insensitive' } },
        { brand: { contains: search as string, mode: 'insensitive' } },
        { manufacturer: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (category) where.category = category as string;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (lowStock === 'true') where.stockQuantity = { lte: prisma.medicine.fields.minStockLevel };

    const [medicines, total] = await Promise.all([
      prisma.medicine.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.medicine.count({ where }),
    ]);

    sendPaginated(res, medicines, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const medicine = await prisma.medicine.findUnique({ where: { id: req.params.id } });
    if (!medicine) { sendError(res, 'Medicine not found', 404); return; }
    sendSuccess(res, medicine);
  } catch (error) {
    next(error);
  }
};

export const createMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = {
      ...req.body,
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : undefined,
    };
    const medicine = await prisma.medicine.create({ data });
    await createAuditLog(req.user!.userId, 'CREATE_MEDICINE', 'Medicine', medicine.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, medicine, 'Medicine created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Record<string, unknown> = { ...req.body };
    if (data.expiryDate) data.expiryDate = new Date(data.expiryDate as string);
    const medicine = await prisma.medicine.update({ where: { id }, data });
    sendSuccess(res, medicine, 'Medicine updated');
  } catch (error) {
    next(error);
  }
};

export const deleteMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.medicine.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Medicine deactivated');
  } catch (error) {
    next(error);
  }
};

export const getLowStockMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const [medicines, total] = await Promise.all([
      prisma.medicine.findMany({
        where: { stockQuantity: { lte: prisma.medicine.fields.minStockLevel }, isActive: true },
        skip,
        take: limit,
        orderBy: { stockQuantity: 'asc' },
      }),
      prisma.medicine.count({ where: { stockQuantity: { lte: prisma.medicine.fields.minStockLevel }, isActive: true } }),
    ]);
    sendPaginated(res, medicines, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity, operation } = req.body;

    const medicine = await prisma.medicine.findUnique({ where: { id } });
    if (!medicine) { sendError(res, 'Medicine not found', 404); return; }

    const newStock = operation === 'add' ? medicine.stockQuantity + quantity : Math.max(0, medicine.stockQuantity - quantity);

    const updated = await prisma.medicine.update({
      where: { id },
      data: { stockQuantity: newStock },
    });

    sendSuccess(res, updated, 'Stock updated');
  } catch (error) {
    next(error);
  }
};

export const getSales = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const where: Prisma.PharmacySaleWhereInput = {};
    if (req.query.patientId) where.patientId = req.query.patientId as string;

    const [sales, total] = await Promise.all([
      prisma.pharmacySale.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { medicine: { select: { id: true, name: true, genericName: true, unit: true } } } },
          payment: true,
        },
      }),
      prisma.pharmacySale.count({ where }),
    ]);

    sendPaginated(res, sales, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getSale = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sale = await prisma.pharmacySale.findUnique({
      where: { id: req.params.id },
      include: {
        items: { include: { medicine: true } },
        payment: true,
      },
    });
    if (!sale) { sendError(res, 'Sale not found', 404); return; }
    sendSuccess(res, sale);
  } catch (error) {
    next(error);
  }
};

export const createSale = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, prescriptionId, items, discount = 0, tax = 0, paymentMode, notes } = req.body;

    const totalAmount = items.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice, 0);
    const grandTotal = Math.round((totalAmount - discount + tax) * 100) / 100;

    const count = await prisma.pharmacySale.count();
    const sale = await prisma.pharmacySale.create({
      data: {
        invoiceNo: `PHY${String(count + 1).padStart(6, '0')}`,
        patientId: patientId || null,
        prescriptionId: prescriptionId || null,
        totalAmount,
        discount,
        tax,
        grandTotal,
        paymentMode: paymentMode || 'CASH',
        paymentStatus: 'PAID',
        notes,
        soldBy: req.user!.userId,
        items: {
          create: items.map((item: { medicineId: string; quantity: number; unitPrice: number }) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },
      include: { items: { include: { medicine: { select: { id: true, name: true, unit: true } } } } },
    });

    for (const item of items) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }

    await createAuditLog(req.user!.userId, 'CREATE_PHARMACY_SALE', 'PharmacySale', sale.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, sale, 'Sale completed successfully');
  } catch (error) {
    next(error);
  }
};

export const getPurchaseOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status } = req.query;

    const where: Prisma.PurchaseOrderWhereInput = {};
    if (status) where.status = status as string;

    const [orders, total] = await Promise.all([
      prisma.purchaseOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { orderDate: 'desc' },
        include: {
          items: { include: { medicine: { select: { id: true, name: true, unit: true } } } },
        },
      }),
      prisma.purchaseOrder.count({ where }),
    ]);

    sendPaginated(res, orders, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const createPurchaseOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { supplierId, expectedDate, notes, items } = req.body;
    const totalAmount = items.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice, 0);

    const count = await prisma.purchaseOrder.count();
    const order = await prisma.purchaseOrder.create({
      data: {
        orderNo: `PO${String(count + 1).padStart(6, '0')}`,
        supplierId,
        expectedDate: expectedDate ? new Date(expectedDate) : undefined,
        totalAmount,
        notes,
        createdBy: req.user!.userId,
        items: {
          create: items.map((item: { medicineId: string; quantity: number; unitPrice: number }) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },
      include: { items: { include: { medicine: { select: { id: true, name: true } } } } },
    });

    await createAuditLog(req.user!.userId, 'CREATE_PURCHASE_ORDER', 'PurchaseOrder', order.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, order, 'Purchase order created');
  } catch (error) {
    next(error);
  }
};

export const receivePurchaseOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await prisma.purchaseOrder.findUnique({ where: { id }, include: { items: true } });
    if (!order) { sendError(res, 'Purchase order not found', 404); return; }

    for (const item of order.items) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: { stockQuantity: { increment: item.quantity } },
      });
      await prisma.purchaseOrderItem.update({
        where: { id: item.id },
        data: { receivedQty: item.quantity },
      });
    }

    await prisma.purchaseOrder.update({ where: { id }, data: { status: 'RECEIVED', approvedBy: req.user!.userId } });
    sendSuccess(res, null, 'Purchase order received and stock updated');
  } catch (error) {
    next(error);
  }
};

export const getPharmacyDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [totalMedicines, lowStockCount, todaySales, totalSalesValue] = await Promise.all([
      prisma.medicine.count({ where: { isActive: true } }),
      prisma.medicine.count({ where: { stockQuantity: { lte: 10 }, isActive: true } }),
      prisma.pharmacySale.aggregate({
        _sum: { grandTotal: true },
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      }),
      prisma.pharmacySale.aggregate({ _sum: { grandTotal: true } }),
    ]);

    sendSuccess(res, {
      totalMedicines,
      lowStockCount,
      todaySales: todaySales._sum.grandTotal || 0,
      totalSalesValue: totalSalesValue._sum.grandTotal || 0,
    });
  } catch (error) {
    next(error);
  }
};
