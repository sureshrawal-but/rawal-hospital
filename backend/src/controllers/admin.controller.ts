import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getSystemStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [users, patients, doctors, staff, appointments, invoices, beds] = await Promise.all([
      prisma.user.count(),
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.staff.count(),
      prisma.appointment.count(),
      prisma.invoice.count(),
      prisma.bed.count(),
    ]);

    sendSuccess(res, { users, patients, doctors, staff, appointments, invoices, beds });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { role, isActive, search } = req.query;

    const where: Record<string, unknown> = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (search) {
      where.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          isVerified: true,
          lastLogin: true,
          createdAt: true,
          patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
          doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
          staff: { select: { id: true, firstName: true, lastName: true, designation: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    sendPaginated(res, users, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
        lastLogin: true,
        createdAt: true,
        patient: { include: { appointments: { take: 5, orderBy: { createdAt: 'desc' } } } },
        doctor: { include: { department: true, appointments: { take: 5, orderBy: { createdAt: 'desc' } } } },
        staff: true,
        auditLogs: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) { sendError(res, 'User not found', 404); return; }
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { isActive } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive },
      select: { id: true, email: true, role: true, isActive: true },
    });
    await createAuditLog(req.user!.userId, isActive ? 'ACTIVATE_USER' : 'DEACTIVATE_USER', 'User', req.params.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, user, `User ${isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, role: true },
    });
    await createAuditLog(req.user!.userId, 'UPDATE_USER_ROLE', 'User', req.params.id, { newRole: role }, req.ip, req.headers['user-agent']);
    sendSuccess(res, user, 'User role updated');
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { userId, action, entity } = req.query;

    const where: Record<string, unknown> = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;
    if (entity) where.entity = entity;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, email: true, role: true } } },
      }),
      prisma.auditLog.count({ where }),
    ]);

    sendPaginated(res, logs, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getSystemSettings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const settings = await prisma.systemSetting.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });

    const grouped: Record<string, Record<string, string>> = {};
    for (const setting of settings) {
      if (!grouped[setting.group]) grouped[setting.group] = {};
      grouped[setting.group][setting.key] = setting.value;
    }

    sendSuccess(res, grouped);
  } catch (error) {
    next(error);
  }
};

export const updateSystemSetting = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { key, value, group } = req.body;
    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value, group: group || 'GENERAL' },
      create: { key, value, group: group || 'GENERAL' },
    });
    await createAuditLog(req.user!.userId, 'UPDATE_SETTING', 'SystemSetting', key, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, setting, 'Setting updated');
  } catch (error) {
    next(error);
  }
};

export const getTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { isApproved } = req.query;

    const where: Record<string, unknown> = {};
    if (isApproved !== undefined) where.isApproved = isApproved === 'true';

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.count({ where }),
    ]);

    sendPaginated(res, testimonials, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    sendSuccess(res, testimonial, 'Testimonial created');
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, testimonial, 'Testimonial updated');
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Testimonial deleted');
  } catch (error) {
    next(error);
  }
};
