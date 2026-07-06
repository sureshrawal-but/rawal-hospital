import { Request, Response, NextFunction } from 'express';
interface AuditOptions {
    entity?: string;
    action?: string;
    getEntityId?: (req: Request) => string | undefined;
}
export declare const auditLog: (options: AuditOptions) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createAuditLog: (userId: string, action: string, entity?: string, entityId?: string, details?: Record<string, unknown>, ipAddress?: string, userAgent?: string) => Promise<void>;
export {};
//# sourceMappingURL=audit.d.ts.map