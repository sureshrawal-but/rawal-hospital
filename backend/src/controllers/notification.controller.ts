import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';

export const getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { isRead } = req.query;

    const where: Record<string, unknown> = { userId: req.user!.userId };
    if (isRead !== undefined) where.isRead = isRead === 'true';

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    const unreadCount = await prisma.notification.count({
      where: { userId: req.user!.userId, isRead: false },
    });

    sendPaginated(res, notifications, total, page, limit);
    res.setHeader('X-Unread-Count', unreadCount.toString());
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findFirst({
      where: { id, userId: req.user!.userId },
    });
    if (!notification) { sendError(res, 'Notification not found', 404); return; }

    await prisma.notification.update({ where: { id }, data: { isRead: true } });
    sendSuccess(res, null, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.userId, isRead: false },
      data: { isRead: true },
    });
    sendSuccess(res, null, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.notification.deleteMany({
      where: { id: req.params.id, userId: req.user!.userId },
    });
    sendSuccess(res, null, 'Notification deleted');
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const count = await prisma.notification.count({
      where: { userId: req.user!.userId, isRead: false },
    });
    sendSuccess(res, { count });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (
  userId: string, title: string, message: string, type = 'INFO', link?: string,
): Promise<void> => {
  try {
    await prisma.notification.create({
      data: { userId, title, message, type, link },
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};
