import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getSystemStats, getUsers, getUser, updateUserStatus, updateUserRole,
  getAuditLogs, getSystemSettings, updateSystemSetting,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
} from '../controllers/admin.controller';

const router: Router = Router();

router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/stats', getSystemStats);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id/status', updateUserStatus);
router.patch('/users/:id/role', updateUserRole);
router.get('/audit-logs', getAuditLogs);
router.get('/settings', getSystemSettings);
router.put('/settings', updateSystemSetting);

router.get('/testimonials', getTestimonials);
router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

export default router;
