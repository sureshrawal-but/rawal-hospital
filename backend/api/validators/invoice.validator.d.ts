import { z } from 'zod';
export declare const createInvoiceSchema: z.ZodObject<{
    patientId: z.ZodString;
    appointmentId: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    discount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    discountType: z.ZodDefault<z.ZodOptional<z.ZodEnum<["PERCENTAGE", "FIXED"]>>>;
    tax: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["CONSULTATION", "MEDICINE", "LAB_TEST", "PROCEDURE", "ROOM_CHARGE", "OTHER"]>>>;
    }, "strip", z.ZodTypeAny, {
        type: "OTHER" | "CONSULTATION" | "MEDICINE" | "LAB_TEST" | "PROCEDURE" | "ROOM_CHARGE";
        description: string;
        quantity: number;
        unitPrice: number;
    }, {
        description: string;
        quantity: number;
        unitPrice: number;
        type?: "OTHER" | "CONSULTATION" | "MEDICINE" | "LAB_TEST" | "PROCEDURE" | "ROOM_CHARGE" | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    patientId: string;
    items: {
        type: "OTHER" | "CONSULTATION" | "MEDICINE" | "LAB_TEST" | "PROCEDURE" | "ROOM_CHARGE";
        description: string;
        quantity: number;
        unitPrice: number;
    }[];
    discount: number;
    tax: number;
    discountType: "PERCENTAGE" | "FIXED";
    notes?: string | undefined;
    appointmentId?: string | undefined;
    dueDate?: string | undefined;
}, {
    patientId: string;
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
        type?: "OTHER" | "CONSULTATION" | "MEDICINE" | "LAB_TEST" | "PROCEDURE" | "ROOM_CHARGE" | undefined;
    }[];
    notes?: string | undefined;
    discount?: number | undefined;
    tax?: number | undefined;
    appointmentId?: string | undefined;
    dueDate?: string | undefined;
    discountType?: "PERCENTAGE" | "FIXED" | undefined;
}>;
export declare const updateInvoiceSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED", "REFUNDED"]>>;
    dueDate: z.ZodOptional<z.ZodString>;
    discount: z.ZodOptional<z.ZodNumber>;
    discountType: z.ZodOptional<z.ZodEnum<["PERCENTAGE", "FIXED"]>>;
    tax: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "CANCELLED" | "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "REFUNDED" | undefined;
    notes?: string | undefined;
    discount?: number | undefined;
    tax?: number | undefined;
    dueDate?: string | undefined;
    discountType?: "PERCENTAGE" | "FIXED" | undefined;
}, {
    status?: "CANCELLED" | "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "REFUNDED" | undefined;
    notes?: string | undefined;
    discount?: number | undefined;
    tax?: number | undefined;
    dueDate?: string | undefined;
    discountType?: "PERCENTAGE" | "FIXED" | undefined;
}>;
export declare const createPaymentSchema: z.ZodObject<{
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    paymentMode: z.ZodString;
    transactionId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    invoiceId: string;
    amount: number;
    paymentMode: string;
    notes?: string | undefined;
    transactionId?: string | undefined;
}, {
    invoiceId: string;
    amount: number;
    paymentMode: string;
    notes?: string | undefined;
    transactionId?: string | undefined;
}>;
export declare const invoiceQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    patientId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: string | undefined;
    page?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    limit?: string | undefined;
    page?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
//# sourceMappingURL=invoice.validator.d.ts.map