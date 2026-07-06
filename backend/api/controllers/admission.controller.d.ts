import { Request, Response, NextFunction } from 'express';
export declare const getAdmissions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAdmission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createAdmission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateAdmission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const dischargePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCurrentAdmissions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAdmissionStats: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admission.controller.d.ts.map