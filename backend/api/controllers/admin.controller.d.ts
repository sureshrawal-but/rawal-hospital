import { Request, Response, NextFunction } from 'express';
export declare const getSystemStats: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAuditLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSystemSettings: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateSystemSetting: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTestimonials: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTestimonial: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateTestimonial: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteTestimonial: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map