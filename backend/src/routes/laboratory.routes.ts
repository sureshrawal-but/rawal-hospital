import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  getLabTests, getLabTest, createLabTest, updateLabTest, deleteLabTest,
  getLabReports, getLabReport, createLabReport, updateLabReport, deleteLabReport,
  verifyLabReport, collectSample, uploadResults,
  getPatientLabReports, getLabDashboard,
} from '../controllers/laboratory.controller';

const router = Router();

router.get('/dashboard', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'LAB_TECHNICIAN'), getLabDashboard);

router.get('/tests', getLabTests);
router.get('/tests/:id', getLabTest);
router.post('/tests', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'LAB_TECHNICIAN'), createLabTest);
router.put('/tests/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'LAB_TECHNICIAN'), updateLabTest);
router.delete('/tests/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteLabTest);

router.get('/reports', authenticate, getLabReports);
router.get('/reports/patient/:patientId', authenticate, getPatientLabReports);
router.get('/reports/:id', authenticate, getLabReport);
router.post('/reports', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'LAB_TECHNICIAN', 'DOCTOR'), createLabReport);
router.put('/reports/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'LAB_TECHNICIAN', 'DOCTOR'), updateLabReport);
router.delete('/reports/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteLabReport);
router.patch('/reports/:id/collect-sample', authenticate, authorize('LAB_TECHNICIAN', 'NURSE'), collectSample);
router.post('/reports/:id/results', authenticate, authorize('LAB_TECHNICIAN'), upload.single('file'), uploadResults);
router.patch('/reports/:id/verify', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'DOCTOR'), verifyLabReport);

export default router;
