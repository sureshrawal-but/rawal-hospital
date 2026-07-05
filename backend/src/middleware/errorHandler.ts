import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode, err.constructor.name);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      sendError(res, `Duplicate value for ${target}. This record already exists.`, 409, 'DUPLICATE_ERROR');
      return;
    }
    if (err.code === 'P2025') {
      sendError(res, 'Record not found.', 404, 'NOT_FOUND');
      return;
    }
    if (err.code === 'P2003') {
      sendError(res, 'Referenced record does not exist.', 404, 'FOREIGN_KEY_ERROR');
      return;
    }
    sendError(res, 'Database error occurred.', 400, 'DATABASE_ERROR');
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    sendError(res, 'Invalid data provided.', 400, 'VALIDATION_ERROR');
    return;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    sendError(res, 'Invalid or expired token.', 401, 'AUTH_ERROR');
    return;
  }

  sendError(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    500,
    'INTERNAL_ERROR',
  );
};
