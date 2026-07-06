export declare const sendEmail: (to: string, subject: string, templateName: string, context: Record<string, unknown>) => Promise<void>;
export declare const sendPasswordResetEmail: (email: string, resetToken: string, firstName: string) => Promise<void>;
export declare const sendAppointmentConfirmation: (email: string, patientName: string, doctorName: string, date: string, time: string, appointmentNo: string) => Promise<void>;
export declare const sendInvoiceEmail: (email: string, patientName: string, invoiceNo: string, amount: number, dueDate: string) => Promise<void>;
export declare const verifyTransporter: () => Promise<boolean>;
//# sourceMappingURL=email.job.d.ts.map