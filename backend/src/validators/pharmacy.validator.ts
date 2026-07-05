import { z } from 'zod';

export const createMedicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  genericName: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  manufacturer: z.string().optional(),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  pricePerUnit: z.number().min(0, 'Price must be positive'),
  stockQuantity: z.number().int().min(0).default(0),
  minStockLevel: z.number().int().min(0).default(10),
  maxStockLevel: z.number().int().min(0).default(100),
  expiryDate: z.string().optional(),
  batchNo: z.string().optional(),
  rackNo: z.string().optional(),
  requiresPrescription: z.boolean().optional().default(true),
  description: z.string().optional(),
  sideEffects: z.any().optional(),
});

export const updateMedicineSchema = z.object({
  name: z.string().min(1).optional(),
  genericName: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  manufacturer: z.string().optional(),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  unit: z.string().min(1).optional(),
  pricePerUnit: z.number().min(0).optional(),
  stockQuantity: z.number().int().min(0).optional(),
  minStockLevel: z.number().int().min(0).optional(),
  maxStockLevel: z.number().int().min(0).optional(),
  expiryDate: z.string().optional(),
  batchNo: z.string().optional(),
  rackNo: z.string().optional(),
  requiresPrescription: z.boolean().optional(),
  description: z.string().optional(),
  sideEffects: z.any().optional(),
  isActive: z.boolean().optional(),
});

export const createSaleSchema = z.object({
  patientId: z.string().optional(),
  prescriptionId: z.string().optional(),
  items: z.array(z.object({
    medicineId: z.string().min(1, 'Medicine ID is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().min(0),
  })).min(1, 'At least one item is required'),
  discount: z.number().min(0).optional().default(0),
  tax: z.number().min(0).optional().default(0),
  paymentMode: z.string().optional(),
  notes: z.string().optional(),
});

export const createPurchaseOrderSchema = z.object({
  supplierId: z.string().min(1, 'Supplier ID is required'),
  expectedDate: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    medicineId: z.string().min(1, 'Medicine ID is required'),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
  })).min(1, 'At least one item is required'),
});

export const pharmacyQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  isActive: z.string().optional(),
  lowStock: z.string().optional(),
});

export const lowStockQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
