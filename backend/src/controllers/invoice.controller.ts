import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status, patientId, startDate, endDate } = req.query;

    const where: Prisma.InvoiceWhereInput = {};
    if (status) where.status = status as string as any;
    if (patientId) where.patientId = patientId as string;
    if (startDate && endDate) {
      where.invoiceDate = { gte: new Date(startDate as string), lte: new Date(endDate as string) };
    }

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true } },
          items: true,
          payment: { select: { id: true, paymentNo: true, amount: true, paymentMode: true, status: true, receivedAt: true } },
          appointment: { select: { id: true, appointmentNo: true, date: true } },
        },
      }),
      prisma.invoice.count({ where }),
    ]);

    sendPaginated(res, invoices, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true, address: true, city: true, state: true, pincode: true, email: true } },
        items: true,
        payment: true,
        appointment: { select: { id: true, appointmentNo: true, date: true, doctor: { select: { firstName: true, lastName: true, specialization: true } } } },
      },
    });

    if (!invoice) { sendError(res, 'Invoice not found', 404); return; }
    sendSuccess(res, invoice);
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, appointmentId, dueDate, discount = 0, discountType = 'PERCENTAGE', tax = 0, notes, items } = req.body;

    const subtotal = items.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice, 0);
    const discountAmount = discountType === 'PERCENTAGE' ? subtotal * (discount / 100) : discount;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (tax / 100);
    const total = taxableAmount + taxAmount;

    const count = await prisma.invoice.count();
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: `INV${String(count + 1).padStart(6, '0')}`,
        patientId,
        appointmentId,
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subtotal,
        discount,
        discountType,
        tax,
        total: Math.round(total * 100) / 100,
        createdBy: req.user!.userId,
        notes,
        items: {
          create: items.map((item: { description: string; quantity: number; unitPrice: number; type?: string }) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            type: item.type || 'CONSULTATION',
          })),
        },
      },
      include: { patient: true, items: true, payment: true },
    });

    await createAuditLog(req.user!.userId, 'CREATE_INVOICE', 'Invoice', invoice.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, invoice, 'Invoice created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.update({
      where: { id },
      data: req.body,
    });
    sendSuccess(res, invoice, 'Invoice updated');
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.invoice.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } });
    sendSuccess(res, null, 'Invoice cancelled');
  } catch (error) {
    next(error);
  }
};

export const getPatientInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { patientId: req.params.patientId },
      orderBy: { createdAt: 'desc' },
      include: { items: true, payment: true },
    });
    sendSuccess(res, invoices);
  } catch (error) {
    next(error);
  }
};

export const addInvoiceItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { description, quantity, unitPrice, type } = req.body;
    const totalPrice = quantity * unitPrice;

    const item = await prisma.invoiceItem.create({
      data: {
        invoiceId: req.params.id,
        description,
        quantity,
        unitPrice,
        totalPrice,
        type: type || 'OTHER',
      },
    });

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (invoice) {
      const newSubtotal = invoice.items.reduce((s, i) => s + i.totalPrice, 0);
      const discountAmount = invoice.discountType === 'PERCENTAGE' ? newSubtotal * (invoice.discount / 100) : invoice.discount;
      const newTotal = newSubtotal - discountAmount + (newSubtotal - discountAmount) * (invoice.tax / 100);
      await prisma.invoice.update({
        where: { id: req.params.id },
        data: { subtotal: newSubtotal, total: Math.round(newTotal * 100) / 100 },
      });
    }

    sendCreated(res, item, 'Item added to invoice');
  } catch (error) {
    next(error);
  }
};

export const removeInvoiceItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.invoiceItem.delete({ where: { id: req.params.itemId } });

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (invoice) {
      const newSubtotal = invoice.items.reduce((s, i) => s + i.totalPrice, 0);
      const discountAmount = invoice.discountType === 'PERCENTAGE' ? newSubtotal * (invoice.discount / 100) : invoice.discount;
      const newTotal = newSubtotal - discountAmount + (newSubtotal - discountAmount) * (invoice.tax / 100);
      await prisma.invoice.update({
        where: { id: req.params.id },
        data: { subtotal: newSubtotal, total: Math.round(newTotal * 100) / 100 },
      });
    }

    sendSuccess(res, null, 'Item removed from invoice');
  } catch (error) {
    next(error);
  }
};
