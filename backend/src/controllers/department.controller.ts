import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams, slugify } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getDepartments = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { doctors: true, treatments: true } },
      },
    });
    sendSuccess(res, departments);
  } catch (error) {
    next(error);
  }
};

export const getDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        doctors: {
          where: { isAvailable: true },
          include: { user: { select: { id: true } } },
        },
        treatments: { where: { isActive: true } },
        facilities: true,
        workingHours: { orderBy: { day: 'asc' } },
      },
    });
    if (!department) {
      sendError(res, 'Department not found', 404);
      return;
    }
    sendSuccess(res, department);
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, icon, image, color, floorNo, wing, extensionNo } = req.body;
    const slug = slugify(name);

    const existing = await prisma.department.findUnique({ where: { slug } });
    if (existing) {
      sendError(res, 'Department with this name already exists', 409);
      return;
    }

    const department = await prisma.department.create({
      data: { name, slug, description, icon, image, color, floorNo, wing, extensionNo },
    });

    await createAuditLog(req.user!.userId, 'CREATE_DEPARTMENT', 'Department', department.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, department, 'Department created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.department.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 'Department not found', 404);
      return;
    }

    const data: Record<string, unknown> = { ...req.body };
    if (data.name && data.name !== existing.name) {
      data.slug = slugify(data.name as string);
    }

    const department = await prisma.department.update({
      where: { id },
      data,
    });

    await createAuditLog(req.user!.userId, 'UPDATE_DEPARTMENT', 'Department', id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, department, 'Department updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const department = await prisma.department.findUnique({ where: { id: req.params.id } });
    if (!department) {
      sendError(res, 'Department not found', 404);
      return;
    }
    await prisma.department.update({ where: { id: req.params.id }, data: { isActive: false } });
    await createAuditLog(req.user!.userId, 'DELETE_DEPARTMENT', 'Department', req.params.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, null, 'Department deactivated successfully');
  } catch (error) {
    next(error);
  }
};

export const getDepartmentTreatments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { departmentId: req.params.id, isActive: true },
      orderBy: { name: 'asc' },
    });
    sendSuccess(res, treatments);
  } catch (error) {
    next(error);
  }
};

export const createTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, cost, duration } = req.body;
    const treatment = await prisma.treatment.create({
      data: {
        departmentId: req.params.id,
        name,
        description,
        cost,
        duration,
      },
    });
    await createAuditLog(req.user!.userId, 'CREATE_TREATMENT', 'Treatment', treatment.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, treatment, 'Treatment created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const treatment = await prisma.treatment.update({
      where: { id: req.params.treatmentId },
      data: req.body,
    });
    sendSuccess(res, treatment, 'Treatment updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteTreatment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.treatment.update({
      where: { id: req.params.treatmentId },
      data: { isActive: false },
    });
    sendSuccess(res, null, 'Treatment deleted');
  } catch (error) {
    next(error);
  }
};

export const getDepartmentFacilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facilities = await prisma.departmentFacility.findMany({
      where: { departmentId: req.params.id },
    });
    sendSuccess(res, facilities);
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facility = await prisma.departmentFacility.create({
      data: {
        departmentId: req.params.id,
        ...req.body,
      },
    });
    sendCreated(res, facility, 'Facility created');
  } catch (error) {
    next(error);
  }
};

export const deleteFacility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.departmentFacility.delete({ where: { id: req.params.facilityId } });
    sendSuccess(res, null, 'Facility deleted');
  } catch (error) {
    next(error);
  }
};

export const getDepartmentHours = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hours = await prisma.departmentWorkingHours.findMany({
      where: { departmentId: req.params.id },
      orderBy: { day: 'asc' },
    });
    sendSuccess(res, hours);
  } catch (error) {
    next(error);
  }
};

export const updateWorkingHours = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hours = req.body.hours || req.body;
    if (Array.isArray(hours)) {
      await prisma.departmentWorkingHours.deleteMany({ where: { departmentId: req.params.id } });
      for (const h of hours) {
        await prisma.departmentWorkingHours.create({
          data: {
            departmentId: req.params.id,
            day: h.day,
            openTime: h.openTime,
            closeTime: h.closeTime,
            isClosed: h.isClosed || false,
          },
        });
      }
    }
    const updated = await prisma.departmentWorkingHours.findMany({
      where: { departmentId: req.params.id },
      orderBy: { day: 'asc' },
    });
    sendSuccess(res, updated, 'Working hours updated');
  } catch (error) {
    next(error);
  }
};
