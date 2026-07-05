import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getAdmissions, getAdmission, createAdmission, updateAdmission,
  dischargePatient, getCurrentAdmissions, getAdmissionStats,
} from '../controllers/admission.controller';

const router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'), getAdmissions);
router.get('/current', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'NURSE'), getCurrentAdmissions);
router.get('/stats', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getAdmissionStats);
router.get('/:id', authenticate, getAdmission);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), createAdmission);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), updateAdmission);
router.post('/:id/discharge', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), dischargePatient);

export default router;
