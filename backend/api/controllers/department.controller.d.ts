import { Request, Response, NextFunction } from 'express';
export declare const getDepartments: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDepartment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createDepartment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateDepartment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteDepartment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDepartmentTreatments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTreatment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateTreatment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteTreatment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDepartmentFacilities: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createFacility: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteFacility: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDepartmentHours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateWorkingHours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=department.controller.d.ts.map