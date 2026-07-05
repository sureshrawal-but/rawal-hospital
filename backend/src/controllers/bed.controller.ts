import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getBeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { ward, type, isOccupied, isActive } = req.query;

    const where: Record<string, unknown> = {};
    if (ward) where.ward = ward;
    if (type) where.type = type;
    if (isOccupied !== undefined) where.isOccupied = isOccupied === 'true';
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const [beds, total] = await Promise.all([
      prisma.bed.findMany({ where, skip, take: limit, orderBy: [{ ward: 'asc' }, { bedNo: 'asc' }] }),
      prisma.bed.count({ where }),
    ]);

    sendPaginated(res, beds, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getBed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bed = await prisma.bed.findUnique({ where: { id: req.params.id } });
    if (!bed) { sendError(res, 'Bed not found', 404); return; }
    sendSuccess(res, bed);
  } catch (error) {
    next(error);
  }
};

export const createBed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await prisma.bed.findUnique({
      where: { bedNo_ward: { bedNo: req.body.bedNo, ward: req.body.ward } },
    });
    if (existing) { sendError(res, 'Bed with this number already exists in this ward', 409); return; }

    const bed = await prisma.bed.create({ data: req.body });
    await createAuditLog(req.user!.userId, 'CREATE_BED', 'Bed', bed.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, bed, 'Bed created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bed = await prisma.bed.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, bed, 'Bed updated');
  } catch (error) {
    next(error);
  }
};

export const deleteBed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.bed.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Bed deactivated');
  } catch (error) {
    next(error);
  }
};

export const getAvailableBeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ward, type } = req.query;
    const where: Record<string, unknown> = { isOccupied: false, isActive: true };
    if (ward) where.ward = ward;
    if (type) where.type = type;

    const beds = await prisma.bed.findMany({ where, orderBy: [{ ward: 'asc' }, { bedNo: 'asc' }] });
    sendSuccess(res, beds);
  } catch (error) {
    next(error);
  }
};

export const getBedStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [total, occupied, available, wardStats] = await Promise.all([
      prisma.bed.count({ where: { isActive: true } }),
      prisma.bed.count({ where: { isOccupied: true, isActive: true } }),
      prisma.bed.count({ where: { isOccupied: false, isActive: true } }),
      prisma.bed.groupBy({
        by: ['ward'],
        _count: { id: true },
        where: { isActive: true },
      }),
    ]);

    const wardBreakdown = await Promise.all(
      wardStats.map(async (w) => ({
        ward: w.ward,
        total: w._count.id,
        occupied: await prisma.bed.count({ where: { ward: w.ward, isOccupied: true, isActive: true } }),
        available: await prisma.bed.count({ where: { ward: w.ward, isOccupied: false, isActive: true } }),
      })),
    );

    sendSuccess(res, { total, occupied, available, occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0, wardBreakdown });
  } catch (error) {
    next(error);
  }
};

export const getWards = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const wards = await prisma.bed.findMany({
      where: { isActive: true },
      select: { ward: true },
      distinct: ['ward'],
      orderBy: { ward: 'asc' },
    });
    sendSuccess(res, wards.map((w) => w.ward));
  } catch (error) {
    next(error);
  }
};
