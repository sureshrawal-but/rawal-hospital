import { z } from 'zod';
export declare const createAppointmentSchema: z.ZodObject<{
    patientId: z.ZodString;
    doctorId: z.ZodString;
    departmentId: z.ZodString;
    date: z.ZodEffects<z.ZodString, string, string>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["OPD", "IPD", "EMERGENCY", "FOLLOW_UP", "CONSULTATION"]>>>;
    reason: z.ZodOptional<z.ZodString>;
    symptoms: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isEmergency: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isWalkIn: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    type: "OPD" | "IPD" | "EMERGENCY" | "FOLLOW_UP" | "CONSULTATION";
    patientId: string;
    doctorId: string;
    departmentId: string;
    date: string;
    startTime: string;
    endTime: string;
    isEmergency: boolean;
    isWalkIn: boolean;
    reason?: string | undefined;
    symptoms?: string | undefined;
    notes?: string | undefined;
}, {
    patientId: string;
    doctorId: string;
    departmentId: string;
    date: string;
    startTime: string;
    endTime: string;
    type?: "OPD" | "IPD" | "EMERGENCY" | "FOLLOW_UP" | "CONSULTATION" | undefined;
    reason?: string | undefined;
    symptoms?: string | undefined;
    notes?: string | undefined;
    isEmergency?: boolean | undefined;
    isWalkIn?: boolean | undefined;
}>;
export declare const updateAppointmentSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["SCHEDULED", "CONFIRMED", "CHECKED_IN", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"]>>;
    reason: z.ZodOptional<z.ZodString>;
    symptoms: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "SCHEDULED" | "CONFIRMED" | "CHECKED_IN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW" | undefined;
    date?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    reason?: string | undefined;
    symptoms?: string | undefined;
    notes?: string | undefined;
}, {
    status?: "SCHEDULED" | "CONFIRMED" | "CHECKED_IN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW" | undefined;
    date?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    reason?: string | undefined;
    symptoms?: string | undefined;
    notes?: string | undefined;
}>;
export declare const cancelAppointmentSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export declare const appointmentQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    doctorId: z.ZodOptional<z.ZodString>;
    patientId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: string | undefined;
    page?: string | undefined;
    type?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    doctorId?: string | undefined;
    departmentId?: string | undefined;
    date?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    limit?: string | undefined;
    page?: string | undefined;
    type?: string | undefined;
    status?: string | undefined;
    patientId?: string | undefined;
    doctorId?: string | undefined;
    departmentId?: string | undefined;
    date?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
//# sourceMappingURL=appointment.validator.d.ts.map