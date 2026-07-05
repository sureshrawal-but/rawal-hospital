import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getMedicalRecords, getMedicalRecord, createMedicalRecord,
  updateMedicalRecord, deleteMedicalRecord, getPatientRecords,
} from '../controllers/medicalRecord.controller';

const router: Router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'NURSE'), getMedicalRecords);
router.get('/patient/:patientId', authenticate, getPatientRecords);
router.get('/:id', authenticate, getMedicalRecord);
router.post('/', authenticate, authorize('DOCTOR'), createMedicalRecord);
router.put('/:id', authenticate, authorize('DOCTOR'), updateMedicalRecord);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteMedicalRecord);

export default router;
