import { Request, Response, NextFunction } from 'express';
export declare const getBeds: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getBed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createBed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateBed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteBed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAvailableBeds: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getBedStats: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getWards: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=bed.controller.d.ts.map