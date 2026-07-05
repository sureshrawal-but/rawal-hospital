import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams, hashPassword } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { search, department, designation, isActive } = req.query;

    const where: Prisma.StaffWhereInput = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { employeeId: { contains: search as string } },
        { phone: { contains: search as string } },
      ];
    }
    if (department) where.department = { contains: department as string, mode: 'insensitive' };
    if (designation) where.designation = { contains: designation as string, mode: 'insensitive' };
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        skip,
        take: limit,
        orderBy: { firstName: 'asc' },
        include: { user: { select: { id: true, email: true, role: true, isActive: true } } },
      }),
      prisma.staff.count({ where }),
    ]);

    sendPaginated(res, staff, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getStaffMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { id: true, email: true, role: true, isActive: true, createdAt: true } } },
    });
    if (!staff) { sendError(res, 'Staff member not found', 404); return; }
    sendSuccess(res, staff);
  } catch (error) {
    next(error);
  }
};

export const createStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, department, designation, phone, joiningDate, salary, shift, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) { sendError(res, 'Email already in use', 409); return; }

    const hashed = await hashPassword(password || 'staff123');
    const user = await prisma.user.create({
      data: { email, password: hashed, role: role || 'NURSE' },
    });

    const count = await prisma.staff.count();
    const staff = await prisma.staff.create({
      data: {
        userId: user.id,
        employeeId: `STF${String(count + 1).padStart(5, '0')}`,
        firstName,
        lastName,
        department,
        designation,
        phone,
        email,
        joiningDate: joiningDate ? new Date(joiningDate) : undefined,
        salary: salary || undefined,
        shift,
      },
      include: { user: { select: { id: true, email: true, role: true } } },
    });

    await createAuditLog(req.user!.userId, 'CREATE_STAFF', 'Staff', staff.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, staff, 'Staff member created');
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Record<string, unknown> = { ...req.body };
    if (data.joiningDate) data.joiningDate = new Date(data.joiningDate as string);

    const staff = await prisma.staff.update({ where: { id }, data });
    sendSuccess(res, staff, 'Staff member updated');
  } catch (error) {
    next(error);
  }
};

export const deleteStaff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const staff = await prisma.staff.findUnique({ where: { id: req.params.id } });
    if (!staff) { sendError(res, 'Staff member not found', 404); return; }

    await prisma.user.update({ where: { id: staff.userId }, data: { isActive: false } });
    await prisma.staff.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Staff member deactivated');
  } catch (error) {
    next(error);
  }
};

export const getStaffByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const staff = await prisma.staff.findMany({
      where: { department: { contains: req.params.department, mode: 'insensitive' }, isActive: true },
    });
    sendSuccess(res, staff);
  } catch (error) {
    next(error);
  }
};
