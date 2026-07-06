import { z } from 'zod';
export declare const createLabTestSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    preparation: z.ZodOptional<z.ZodString>;
    sampleType: z.ZodOptional<z.ZodString>;
    turnaroundTime: z.ZodOptional<z.ZodString>;
    cost: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    cost: number;
    category?: string | undefined;
    description?: string | undefined;
    preparation?: string | undefined;
    sampleType?: string | undefined;
    turnaroundTime?: string | undefined;
}, {
    name: string;
    cost: number;
    category?: string | undefined;
    description?: string | undefined;
    preparation?: string | undefined;
    sampleType?: string | undefined;
    turnaroundTime?: string | undefined;
}>;
export declare const updateLabTestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    preparation: z.ZodOptional<z.ZodString>;
    sampleType: z.ZodOptional<z.ZodString>;
    turnaroundTime: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    category?: string | undefined;
    description?: string | undefined;
    isActive?: boolean | undefined;
    cost?: number | undefined;
    preparation?: string | undefined;
    sampleType?: string | undefined;
    turnaroundTime?: string | undefined;
}, {
    name?: string | undefined;
    category?: string | undefined;
    description?: string | undefined;
    isActive?: boolean | undefined;
    cost?: number | undefined;
    preparation?: string | undefined;
    sampleType?: string | undefined;
    turnaroundTime?: string | undefined;
}>;
export declare const createLabReportSchema: z.ZodObject<{
    patientId: z.ZodString;
    testId: z.ZodString;
    appointmentId: z.ZodOptional<z.ZodString>;
    doctorId: z.ZodOptional<z.ZodString>;
    prescribedBy: z.ZodOptional<z.ZodString>;
    sampleType: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    patientId: string;
    testId: string;
    doctorId?: string | undefined;
    notes?: string | undefined;
    appointmentId?: string | undefined;
    sampleType?: string | undefined;
    prescribedBy?: string | undefined;
}, {
    patientId: string;
    testId: string;
    doctorId?: string | undefined;
    notes?: string | undefined;
    appointmentId?: string | undefined;
    sampleType?: string | undefined;
    prescribedBy?: string | undefined;
}>;
export declare const updateLabReportSchema: z.ZodObject<{
    results: z.ZodOptional<z.ZodAny>;
    status: z.ZodOptional<z.ZodEnum<["PENDING", "SAMPLE_COLLECTED", "PROCESSING", "COMPLETED", "VERIFIED", "CANCELLED"]>>;
    notes: z.ZodOptional<z.ZodString>;
    sampleCollectedAt: z.ZodOptional<z.ZodString>;
    resultDate: z.ZodOptional<z.ZodString>;
    fileUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "COMPLETED" | "CANCELLED" | "PENDING" | "SAMPLE_COLLECTED" | "VERIFIED" | "PROCESSING" | undefined;
    notes?: string | undefined;
    sampleCollectedAt?: string | undefined;
    resultDate?: string | undefined;
    results?: any;
    fileUrl?: string | undefined;
}, {
    status?: "COMPLETED" | "CANCELLED" | "PENDING" | "SAMPLE_COLLECTED" | "VERIFIED" | "PROCESSING" | undefined;
    notes?: string | undefined;
    sampleCollectedAt?: string | undefined;
    resultDate?: string | undefined;
    results?: any;
    fileUrl?: string | undefined;
}>;
export declare const verifyLabReportSchema: z.ZodObject<{
    verifiedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    verifiedBy: string;
}, {
    verifiedBy: string;
}>;
export declare const labQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    patientId: z.ZodOptional<z.ZodString>;
    testId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    category?: string | undefined;
    testId?: string | undefined;
}, {
    limit?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    category?: string | undefined;
    testId?: string | undefined;
}>;
//# sourceMappingURL=laboratory.validator.d.ts.map