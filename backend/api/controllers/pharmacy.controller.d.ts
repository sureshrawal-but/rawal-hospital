import { Request, Response, NextFunction } from 'express';
export declare const getMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getLowStockMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStock: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSales: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSale: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createSale: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPurchaseOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createPurchaseOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const receivePurchaseOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPharmacyDashboard: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=pharmacy.controller.d.ts.map