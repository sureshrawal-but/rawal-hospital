import { Request, Response, NextFunction } from 'express';
export declare const getNotifications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markAsRead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markAllAsRead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteNotification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUnreadCount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createNotification: (userId: string, title: string, message: string, type?: string, link?: string) => Promise<void>;
//# sourceMappingURL=notification.controller.d.ts.map