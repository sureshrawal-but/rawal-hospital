import { Request, Response, NextFunction } from 'express';
export declare const getDoctors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorAvailability: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateAvailability: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorTimeOff: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTimeOff: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorsByDepartment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=doctor.controller.d.ts.map