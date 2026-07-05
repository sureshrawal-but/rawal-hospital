import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getAdminDashboard, getDoctorDashboard, getPatientDashboard } from '../controllers/dashboard.controller';

const router: Router = Router();

router.get('/admin', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getAdminDashboard);
router.get('/doctor', authenticate, authorize('DOCTOR'), getDoctorDashboard);
router.get('/patient', authenticate, authorize('PATIENT'), getPatientDashboard);

export default router;
