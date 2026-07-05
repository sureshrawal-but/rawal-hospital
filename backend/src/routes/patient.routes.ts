import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPatientSchema, updatePatientSchema, patientQuerySchema } from '../validators/patient.validator';
import {
  getPatients, getPatient, createPatient, updatePatient, deletePatient, searchPatients,
} from '../controllers/patient.controller';

const router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'DOCTOR', 'NURSE'), getPatients);
router.get('/search', authenticate, searchPatients);
router.get('/:id', authenticate, getPatient);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), validate(createPatientSchema), createPatient);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'DOCTOR'), validate(updatePatientSchema), updatePatient);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deletePatient);

export default router;
