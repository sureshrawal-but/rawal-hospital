import { Request, Response, NextFunction } from 'express';
export declare const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markAsRead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUnreadCount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=contact.controller.d.ts.map