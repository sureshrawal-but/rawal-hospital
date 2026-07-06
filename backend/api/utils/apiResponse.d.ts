import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => void;
export declare const sendError: (res: Response, message: string, statusCode?: number, error?: string, errors?: Record<string, string[]>) => void;
export declare const sendPaginated: <T>(res: Response, data: T[], total: number, page: number, limit: number, message?: string) => void;
export declare const sendCreated: <T>(res: Response, data: T, message?: string) => void;
//# sourceMappingURL=apiResponse.d.ts.map