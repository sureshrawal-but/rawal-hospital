import { Request, Response, NextFunction } from 'express';
export declare const getLabTests: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getLabTest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createLabTest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateLabTest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteLabTest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getLabReports: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getLabReport: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createLabReport: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateLabReport: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteLabReport: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyLabReport: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const collectSample: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const uploadResults: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientLabReports: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getLabDashboard: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=laboratory.controller.d.ts.map