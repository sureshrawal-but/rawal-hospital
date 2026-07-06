import { Request, Response, NextFunction } from 'express';
export declare const getPrescriptions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPrescription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createPrescription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePrescription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePrescription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientPrescriptions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const printPrescription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=prescription.controller.d.ts.map