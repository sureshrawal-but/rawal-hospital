import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment,
  getDepartmentTreatments, createTreatment, updateTreatment, deleteTreatment,
  getDepartmentFacilities, createFacility, deleteFacility,
  getDepartmentHours, updateWorkingHours,
} from '../controllers/department.controller';

const router = Router();

router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createDepartment);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateDepartment);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteDepartment);

router.get('/:id/treatments', getDepartmentTreatments);
router.post('/:id/treatments', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createTreatment);
router.put('/:id/treatments/:treatmentId', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateTreatment);
router.delete('/:id/treatments/:treatmentId', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteTreatment);

router.get('/:id/facilities', getDepartmentFacilities);
router.post('/:id/facilities', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createFacility);
router.delete('/:id/facilities/:facilityId', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteFacility);

router.get('/:id/hours', getDepartmentHours);
router.put('/:id/hours', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateWorkingHours);

export default router;
