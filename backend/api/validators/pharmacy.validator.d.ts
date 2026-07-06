import { z } from 'zod';
export declare const createMedicineSchema: z.ZodObject<{
    name: z.ZodString;
    genericName: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    dosageForm: z.ZodOptional<z.ZodString>;
    strength: z.ZodOptional<z.ZodString>;
    unit: z.ZodString;
    pricePerUnit: z.ZodNumber;
    stockQuantity: z.ZodDefault<z.ZodNumber>;
    minStockLevel: z.ZodDefault<z.ZodNumber>;
    maxStockLevel: z.ZodDefault<z.ZodNumber>;
    expiryDate: z.ZodOptional<z.ZodString>;
    batchNo: z.ZodOptional<z.ZodString>;
    rackNo: z.ZodOptional<z.ZodString>;
    requiresPrescription: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    description: z.ZodOptional<z.ZodString>;
    sideEffects: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    name: string;
    unit: string;
    pricePerUnit: number;
    stockQuantity: number;
    minStockLevel: number;
    maxStockLevel: number;
    requiresPrescription: boolean;
    genericName?: string | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    dosageForm?: string | undefined;
    strength?: string | undefined;
    expiryDate?: string | undefined;
    batchNo?: string | undefined;
    rackNo?: string | undefined;
    description?: string | undefined;
    sideEffects?: any;
}, {
    name: string;
    unit: string;
    pricePerUnit: number;
    genericName?: string | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    dosageForm?: string | undefined;
    strength?: string | undefined;
    stockQuantity?: number | undefined;
    minStockLevel?: number | undefined;
    maxStockLevel?: number | undefined;
    expiryDate?: string | undefined;
    batchNo?: string | undefined;
    rackNo?: string | undefined;
    requiresPrescription?: boolean | undefined;
    description?: string | undefined;
    sideEffects?: any;
}>;
export declare const updateMedicineSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    genericName: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    dosageForm: z.ZodOptional<z.ZodString>;
    strength: z.ZodOptional<z.ZodString>;
    unit: z.ZodOptional<z.ZodString>;
    pricePerUnit: z.ZodOptional<z.ZodNumber>;
    stockQuantity: z.ZodOptional<z.ZodNumber>;
    minStockLevel: z.ZodOptional<z.ZodNumber>;
    maxStockLevel: z.ZodOptional<z.ZodNumber>;
    expiryDate: z.ZodOptional<z.ZodString>;
    batchNo: z.ZodOptional<z.ZodString>;
    rackNo: z.ZodOptional<z.ZodString>;
    requiresPrescription: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    sideEffects: z.ZodOptional<z.ZodAny>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    genericName?: string | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    dosageForm?: string | undefined;
    strength?: string | undefined;
    unit?: string | undefined;
    pricePerUnit?: number | undefined;
    stockQuantity?: number | undefined;
    minStockLevel?: number | undefined;
    maxStockLevel?: number | undefined;
    expiryDate?: string | undefined;
    batchNo?: string | undefined;
    rackNo?: string | undefined;
    requiresPrescription?: boolean | undefined;
    description?: string | undefined;
    sideEffects?: any;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    genericName?: string | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    dosageForm?: string | undefined;
    strength?: string | undefined;
    unit?: string | undefined;
    pricePerUnit?: number | undefined;
    stockQuantity?: number | undefined;
    minStockLevel?: number | undefined;
    maxStockLevel?: number | undefined;
    expiryDate?: string | undefined;
    batchNo?: string | undefined;
    rackNo?: string | undefined;
    requiresPrescription?: boolean | undefined;
    description?: string | undefined;
    sideEffects?: any;
    isActive?: boolean | undefined;
}>;
export declare const createSaleSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodString>;
    prescriptionId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        medicineId: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }, {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }>, "many">;
    discount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    tax: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    paymentMode: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    items: {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }[];
    discount: number;
    tax: number;
    patientId?: string | undefined;
    notes?: string | undefined;
    paymentMode?: string | undefined;
    prescriptionId?: string | undefined;
}, {
    items: {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }[];
    patientId?: string | undefined;
    notes?: string | undefined;
    paymentMode?: string | undefined;
    prescriptionId?: string | undefined;
    discount?: number | undefined;
    tax?: number | undefined;
}>;
export declare const createPurchaseOrderSchema: z.ZodObject<{
    supplierId: z.ZodString;
    expectedDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        medicineId: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }, {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }[];
    supplierId: string;
    notes?: string | undefined;
    expectedDate?: string | undefined;
}, {
    items: {
        medicineId: string;
        quantity: number;
        unitPrice: number;
    }[];
    supplierId: string;
    notes?: string | undefined;
    expectedDate?: string | undefined;
}>;
export declare const pharmacyQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodString>;
    lowStock: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
    category?: string | undefined;
    isActive?: string | undefined;
    lowStock?: string | undefined;
}, {
    limit?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
    category?: string | undefined;
    isActive?: string | undefined;
    lowStock?: string | undefined;
}>;
export declare const lowStockQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: string | undefined;
    page?: string | undefined;
}, {
    limit?: string | undefined;
    page?: string | undefined;
}>;
//# sourceMappingURL=pharmacy.validator.d.ts.map