import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getNotifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount,
} from '../controllers/notification.controller';

const router = Router();

router.get('/', authenticate, getNotifications);
router.get('/unread-count', authenticate, getUnreadCount);
router.patch('/:id/read', authenticate, markAsRead);
router.patch('/read-all', authenticate, markAllAsRead);
router.delete('/:id', authenticate, deleteNotification);

export default router;
