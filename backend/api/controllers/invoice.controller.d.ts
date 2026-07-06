import { Request, Response, NextFunction } from 'express';
export declare const getInvoices: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getInvoice: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createInvoice: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateInvoice: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteInvoice: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientInvoices: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addInvoiceItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const removeInvoiceItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=invoice.controller.d.ts.map