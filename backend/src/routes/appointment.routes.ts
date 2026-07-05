import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createAppointmentSchema, updateAppointmentSchema, cancelAppointmentSchema } from '../validators/appointment.validator';
import {
  getAppointments, getAppointment, createAppointment, updateAppointment, cancelAppointment,
  getTodayAppointments, getAppointmentsByDate, checkInAppointment, completeAppointment,
} from '../controllers/appointment.controller';

const router: Router = Router();

router.get('/', authenticate, getAppointments);
router.get('/today', authenticate, getTodayAppointments);
router.get('/date/:date', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'DOCTOR'), getAppointmentsByDate);
router.get('/:id', authenticate, getAppointment);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'DOCTOR'), validate(createAppointmentSchema), createAppointment);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'DOCTOR'), validate(updateAppointmentSchema), updateAppointment);
router.patch('/:id/cancel', authenticate, validate(cancelAppointmentSchema), cancelAppointment);
router.patch('/:id/check-in', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'NURSE'), checkInAppointment);
router.patch('/:id/complete', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), completeAppointment);

export default router;
