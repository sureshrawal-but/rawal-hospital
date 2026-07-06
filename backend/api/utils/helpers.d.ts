export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateToken: (length?: number) => string;
export declare const generateNumericToken: (length?: number) => string;
export declare const generateEmployeeId: (prefix: string, sequence: number) => string;
export declare const generateRegistrationNo: (sequence: number) => string;
export declare const generateInvoiceNo: (prefix: string, sequence: number) => string;
export declare const generateAppointmentNo: (sequence: number) => string;
export declare const generatePrescriptionNo: (sequence: number) => string;
export declare const generateReportNo: (sequence: number) => string;
export declare const generateAdmissionNo: (sequence: number) => string;
export declare const generatePaymentNo: (sequence: number) => string;
export declare const slugify: (text: string) => string;
export declare const calculateAge: (dateOfBirth: Date) => {
    years: number;
    months: number;
    days: number;
};
export declare const paginateParams: (query: {
    page?: string;
    limit?: string;
}) => {
    page: number;
    limit: number;
    skip: number;
};
export declare const toTitleCase: (str: string) => string;
export declare const sanitizeUser: (user: Record<string, unknown>) => {
    [x: string]: unknown;
};
//# sourceMappingURL=helpers.d.ts.map