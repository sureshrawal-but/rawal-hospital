import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPaymentSchema } from '../validators/invoice.validator';
import {
  getPayments, getPayment, createPayment, updatePayment, deletePayment,
  getInvoicePayments, processRefund, getPaymentSummary,
} from '../controllers/payment.controller';

const router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), getPayments);
router.get('/summary', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), getPaymentSummary);
router.get('/invoice/:invoiceId', authenticate, getInvoicePayments);
router.get('/:id', authenticate, getPayment);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'RECEPTIONIST'), validate(createPaymentSchema), createPayment);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), updatePayment);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deletePayment);
router.post('/:id/refund', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), processRefund);

export default router;
