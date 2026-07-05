import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createMedicineSchema, updateMedicineSchema, createSaleSchema, createPurchaseOrderSchema } from '../validators/pharmacy.validator';
import {
  getMedicines, getMedicine, createMedicine, updateMedicine, deleteMedicine,
  getLowStockMedicines, updateStock,
  getSales, getSale, createSale,
  getPurchaseOrders, createPurchaseOrder, receivePurchaseOrder,
  getPharmacyDashboard,
} from '../controllers/pharmacy.controller';

const router: Router = Router();

router.get('/dashboard', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), getPharmacyDashboard);

router.get('/medicines', authenticate, getMedicines);
router.get('/medicines/low-stock', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), getLowStockMedicines);
router.get('/medicines/:id', authenticate, getMedicine);
router.post('/medicines', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), validate(createMedicineSchema), createMedicine);
router.put('/medicines/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), validate(updateMedicineSchema), updateMedicine);
router.delete('/medicines/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteMedicine);
router.patch('/medicines/:id/stock', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), updateStock);

router.get('/sales', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST', 'ACCOUNTANT'), getSales);
router.get('/sales/:id', authenticate, getSale);
router.post('/sales', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), validate(createSaleSchema), createSale);

router.get('/purchase-orders', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), getPurchaseOrders);
router.post('/purchase-orders', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), validate(createPurchaseOrderSchema), createPurchaseOrder);
router.post('/purchase-orders/:id/receive', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PHARMACIST'), receivePurchaseOrder);

export default router;
