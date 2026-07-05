import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor,
  getDoctorAvailability, updateAvailability,
  getDoctorTimeOff, createTimeOff, getDoctorsByDepartment,
} from '../controllers/doctor.controller';

const router: Router = Router();

router.get('/', getDoctors);
router.get('/department/:departmentId', getDoctorsByDepartment);
router.get('/:id', getDoctor);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createDoctor);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateDoctor);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteDoctor);
router.get('/:id/availability', getDoctorAvailability);
router.put('/:id/availability', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), updateAvailability);
router.get('/:id/time-off', authenticate, getDoctorTimeOff);
router.post('/:id/time-off', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), createTimeOff);

export default router;
