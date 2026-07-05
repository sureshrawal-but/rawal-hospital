import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createInvoiceSchema, updateInvoiceSchema } from '../validators/invoice.validator';
import {
  getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice,
  getPatientInvoices, addInvoiceItem, removeInvoiceItem,
} from '../controllers/invoice.controller';

const router: Router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'RECEPTIONIST'), getInvoices);
router.get('/patient/:patientId', authenticate, getPatientInvoices);
router.get('/:id', authenticate, getInvoice);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'RECEPTIONIST'), validate(createInvoiceSchema), createInvoice);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), validate(updateInvoiceSchema), updateInvoice);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteInvoice);
router.post('/:id/items', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), addInvoiceItem);
router.delete('/:id/items/:itemId', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'), removeInvoiceItem);

export default router;
