import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { category, isPublished } = req.query;

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
      if (where.isPublished) where.publishedAt = { lte: new Date() };
    } else {
      where.isPublished = true;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          tags: true,
          imageUrl: true,
          author: true,
          isPublished: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    sendPaginated(res, posts, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { id: req.params.id },
          { slug: req.params.id },
        ],
      },
    });
    if (!post) { sendError(res, 'Post not found', 404); return; }
    sendSuccess(res, post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, excerpt, content, category, tags, imageUrl, isPublished } = req.body;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tags || undefined,
        imageUrl,
        author: req.user!.userId,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : undefined,
      },
    });

    await createAuditLog(req.user!.userId, 'CREATE_BLOG_POST', 'BlogPost', post.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, post, 'Blog post created');
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Record<string, unknown> = { ...req.body };
    if (data.title) data.slug = String(data.title).toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();

    const post = await prisma.blogPost.update({ where: { id }, data });
    sendSuccess(res, post, 'Blog post updated');
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Blog post deleted');
  } catch (error) {
    next(error);
  }
};

export const publishPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { isPublished: true, publishedAt: new Date() },
    });
    sendSuccess(res, post, 'Blog post published');
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.blogPost.findMany({
      where: { isPublished: true, category: { not: null } },
      select: { category: true },
      distinct: ['category'],
    });
    const uniqueCategories = [...new Set(categories.map((c) => c.category).filter(Boolean))];
    sendSuccess(res, uniqueCategories);
  } catch (error) {
    next(error);
  }
};
