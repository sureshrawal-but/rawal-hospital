import { Request, Response, NextFunction } from 'express';
export declare const getPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getInvoicePayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const processRefund: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPaymentSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=payment.controller.d.ts.map