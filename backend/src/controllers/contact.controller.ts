import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';

export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { isRead } = req.query;

    const where: Record<string, unknown> = {};
    if (isRead !== undefined) where.isRead = isRead === 'true';

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactMessage.count({ where }),
    ]);

    sendPaginated(res, messages, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await prisma.contactMessage.findUnique({ where: { id: req.params.id } });
    if (!message) { sendError(res, 'Message not found', 404); return; }

    await prisma.contactMessage.update({ where: { id: req.params.id }, data: { isRead: true } });
    sendSuccess(res, message);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const msg = await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    sendCreated(res, msg, 'Message sent successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Message deleted');
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.contactMessage.update({ where: { id: req.params.id }, data: { isRead: true } });
    sendSuccess(res, null, 'Message marked as read');
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const count = await prisma.contactMessage.count({ where: { isRead: false } });
    sendSuccess(res, { count });
  } catch (error) {
    next(error);
  }
};
