import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import { Prisma } from '@prisma/client';

interface AuditOptions {
  entity?: string;
  action?: string;
  getEntityId?: (req: Request) => string | undefined;
}

export const auditLog = (options: AuditOptions) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const originalJson = res.json.bind(res);

    res.json = function (body: unknown) {
      if (req.user && res.statusCode < 400) {
        const entityId = options.getEntityId ? options.getEntityId(req) : (req.params.id || undefined);
        const action = options.action || req.method.toLowerCase();

        prisma.auditLog
          .create({
            data: {
              userId: req.user.userId,
              action,
              entity: options.entity,
              entityId,
              details: {
                method: req.method,
                path: req.originalUrl,
                body: req.method !== 'GET' ? sanitizeBody(req.body) : undefined,
              } as Prisma.InputJsonValue,
              ipAddress: req.ip || req.socket.remoteAddress,
              userAgent: req.headers['user-agent'],
            },
          })
          .catch((err) => logger.error('Audit log error:', err));
      }
      return originalJson(body);
    };

    next();
  };
};

function sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
  const sensitiveFields = ['password', 'token', 'refreshToken', 'secret'];
  const sanitized = { ...body };
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  }
  return sanitized;
}

export const createAuditLog = async (
  userId: string,
  action: string,
  entity?: string,
  entityId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string,
  userAgent?: string,
): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: (details || undefined) as Prisma.InputJsonValue | undefined,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    logger.error('Failed to create audit log:', error);
  }
};
