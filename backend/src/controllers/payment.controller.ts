import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status, patientId, paymentMode, startDate, endDate } = req.query;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (patientId) where.patientId = patientId;
    if (paymentMode) where.paymentMode = paymentMode;
    if (startDate && endDate) {
      where.receivedAt = { gte: new Date(startDate as string), lte: new Date(endDate as string) };
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { receivedAt: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true } },
          invoice: { select: { id: true, invoiceNo: true, total: true } },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    sendPaginated(res, payments, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true } },
        invoice: { include: { items: true } },
      },
    });

    if (!payment) { sendError(res, 'Payment not found', 404); return; }
    sendSuccess(res, payment);
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { invoiceId, amount, paymentMode, transactionId, notes } = req.body;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { payment: true },
    });
    if (!invoice) { sendError(res, 'Invoice not found', 404); return; }

    const count = await prisma.payment.count();
    const payment = await prisma.payment.create({
      data: {
        paymentNo: `PAY${String(count + 1).padStart(6, '0')}`,
        invoiceId,
        patientId: invoice.patientId,
        amount,
        paymentMode,
        transactionId,
        status: 'PAID',
        notes,
        receivedBy: req.user!.userId,
      },
    });

    const totalPaid = invoice.paidAmount + amount;
    const newStatus = totalPaid >= invoice.total ? 'PAID' : 'PARTIALLY_PAID';
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: totalPaid,
        status: newStatus as any,
      },
    });

    await createAuditLog(req.user!.userId, 'CREATE_PAYMENT', 'Payment', payment.id, { invoiceId, amount, paymentMode }, req.ip, req.headers['user-agent']);
    sendCreated(res, payment, 'Payment recorded successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    sendSuccess(res, payment, 'Payment updated');
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: { invoice: true },
    });
    if (!payment) { sendError(res, 'Payment not found', 404); return; }

    if (payment.invoice) {
      const newPaidAmount = payment.invoice.paidAmount - payment.amount;
      await prisma.invoice.update({
        where: { id: payment.invoiceId },
        data: {
          paidAmount: Math.max(0, newPaidAmount),
          status: newPaidAmount <= 0 ? 'SENT' : 'PARTIALLY_PAID',
        },
      });
    }

    await prisma.payment.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } as any });
    sendSuccess(res, null, 'Payment cancelled');
  } catch (error) {
    next(error);
  }
};

export const getInvoicePayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payments = await prisma.payment.findMany({
      where: { invoiceId: req.params.invoiceId },
      orderBy: { receivedAt: 'desc' },
    });
    sendSuccess(res, payments);
  } catch (error) {
    next(error);
  }
};

export const processRefund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) { sendError(res, 'Payment not found', 404); return; }

    await prisma.payment.update({ where: { id }, data: { status: 'REFUNDED' } });
    await prisma.invoice.update({
      where: { id: payment.invoiceId },
      data: { status: 'REFUNDED', paidAmount: { decrement: payment.amount } },
    });

    sendSuccess(res, null, 'Payment refunded');
  } catch (error) {
    next(error);
  }
};

export const getPaymentSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [totalRevenue, totalPayments, pendingAmount, todayCollection] = await Promise.all([
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PAID' } }),
      prisma.payment.count({ where: { status: 'PAID' } }),
      prisma.invoice.aggregate({ _sum: { total: true }, where: { status: { in: ['SENT', 'OVERDUE', 'PARTIALLY_PAID'] } } }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          status: 'PAID',
          receivedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    sendSuccess(res, {
      totalRevenue: totalRevenue._sum?.amount || 0,
      totalPayments,
      pendingAmount: pendingAmount._sum?.total || 0,
      todayCollection: todayCollection._sum?.amount || 0,
    });
  } catch (error) {
    next(error);
  }
};
