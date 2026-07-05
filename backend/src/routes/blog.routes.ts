import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getPosts, getPost, createPost, updatePost, deletePost, publishPost, getCategories,
} from '../controllers/blog.controller';

const router = Router();

router.get('/', getPosts);
router.get('/categories', getCategories);
router.get('/:id', getPost);
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createPost);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), updatePost);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), deletePost);
router.patch('/:id/publish', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), publishPost);

export default router;
