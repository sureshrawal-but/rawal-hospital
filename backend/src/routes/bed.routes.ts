import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getBeds, getBed, createBed, updateBed, deleteBed,
  getAvailableBeds, getBedStats, getWards,
} from '../controllers/bed.controller';

const router: Router = Router();

router.get('/', authenticate, getBeds);
router.get('/stats', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'NURSE'), getBedStats);
router.get('/available', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST', 'NURSE', 'DOCTOR'), getAvailableBeds);
router.get('/wards', authenticate, getWards);
router.get('/:id', authenticate, getBed);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createBed);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updateBed);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteBed);

export default router;
