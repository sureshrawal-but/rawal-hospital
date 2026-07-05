import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getMessages, getMessage, createMessage, deleteMessage, markAsRead, getUnreadCount,
} from '../controllers/contact.controller';

const router: Router = Router();

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getMessages);
router.get('/unread-count', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getUnreadCount);
router.get('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), getMessage);
router.post('/', createMessage);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deleteMessage);
router.patch('/:id/read', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), markAsRead);

export default router;
