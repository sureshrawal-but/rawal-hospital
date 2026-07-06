import { Request, Response, NextFunction } from 'express';
export declare const getAppointments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const cancelAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTodayAppointments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAppointmentsByDate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkInAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const completeAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=appointment.controller.d.ts.map