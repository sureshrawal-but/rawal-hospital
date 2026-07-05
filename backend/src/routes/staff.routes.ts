import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getStaff, getStaffMember, createStaff, updateStaff, deleteStaff, getStaffByDepartment,
} from '../controllers/staff.controller';

const router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getStaff);
router.get('/department/:department', authenticate, getStaffByDepartment);
router.get('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getStaffMember);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createStaff);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateStaff);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteStaff);

export default router;
