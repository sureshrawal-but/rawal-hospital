import { z } from 'zod';

export const createInvoiceSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  appointmentId: z.string().optional(),
  dueDate: z.string().optional(),
  discount: z.number().min(0).optional().default(0),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).optional().default('PERCENTAGE'),
  tax: z.number().min(0).optional().default(0),
  notes: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().min(0, 'Unit price must be positive'),
    type: z.enum(['CONSULTATION', 'MEDICINE', 'LAB_TEST', 'PROCEDURE', 'ROOM_CHARGE', 'OTHER']).optional().default('OTHER'),
  })).min(1, 'At least one item is required'),
});

export const updateInvoiceSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED']).optional(),
  dueDate: z.string().optional(),
  discount: z.number().min(0).optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(),
  tax: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const createPaymentSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice ID is required'),
  amount: z.number().min(0.01, 'Amount must be positive'),
  paymentMode: z.string().min(1, 'Payment mode is required'),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
});

export const invoiceQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
  patientId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
