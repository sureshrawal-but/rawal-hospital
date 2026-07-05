import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getPrescriptions, getPrescription, createPrescription,
  updatePrescription, deletePrescription, getPatientPrescriptions, printPrescription,
} from '../controllers/prescription.controller';

const router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'PHARMACIST'), getPrescriptions);
router.get('/patient/:patientId', authenticate, getPatientPrescriptions);
router.get('/:id', authenticate, getPrescription);
router.get('/:id/print', authenticate, printPrescription);
router.post('/', authenticate, authorize('DOCTOR'), createPrescription);
router.put('/:id', authenticate, authorize('DOCTOR'), updatePrescription);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), deletePrescription);

export default router;
