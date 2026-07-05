import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getLabTests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, category, isActive } = req.query;
    const where: Prisma.LabTestWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { category: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (category) where.category = category as string;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const tests = await prisma.labTest.findMany({
      where,
      orderBy: { name: 'asc' },
    });
    sendSuccess(res, tests);
  } catch (error) {
    next(error);
  }
};

export const getLabTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const test = await prisma.labTest.findUnique({ where: { id: req.params.id } });
    if (!test) { sendError(res, 'Lab test not found', 404); return; }
    sendSuccess(res, test);
  } catch (error) {
    next(error);
  }
};

export const createLabTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, category, description, preparation, sampleType, turnaroundTime, cost } = req.body;
    const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');

    const test = await prisma.labTest.create({
      data: { name, slug, category, description, preparation, sampleType, turnaroundTime, cost },
    });

    await createAuditLog(req.user!.userId, 'CREATE_LAB_TEST', 'LabTest', test.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, test, 'Lab test created');
  } catch (error) {
    next(error);
  }
};

export const updateLabTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const test = await prisma.labTest.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, test, 'Lab test updated');
  } catch (error) {
    next(error);
  }
};

export const deleteLabTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.labTest.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Lab test deactivated');
  } catch (error) {
    next(error);
  }
};

export const getLabReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status, patientId, testId, search } = req.query;

    const where: Prisma.LabReportWhereInput = {};
    if (status) where.status = status as string;
    if (patientId) where.patientId = patientId as string;
    if (testId) where.testId = testId as string;

    const [reports, total] = await Promise.all([
      prisma.labReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true, gender: true } },
          test: { select: { id: true, name: true, category: true, cost: true } },
        },
      }),
      prisma.labReport.count({ where }),
    ]);

    sendPaginated(res, reports, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getLabReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await prisma.labReport.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, dateOfBirth: true, gender: true, phone: true } },
        test: true,
      },
    });
    if (!report) { sendError(res, 'Lab report not found', 404); return; }
    sendSuccess(res, report);
  } catch (error) {
    next(error);
  }
};

export const createLabReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, testId, appointmentId, doctorId, prescribedBy, sampleType, notes } = req.body;
    const count = await prisma.labReport.count();

    const report = await prisma.labReport.create({
      data: {
        reportNo: `LAB${String(count + 1).padStart(6, '0')}`,
        patientId,
        testId,
        appointmentId: appointmentId || null,
        doctorId: doctorId || null,
        prescribedBy: prescribedBy || req.user!.userId,
        sampleType,
        notes,
        createdBy: req.user!.userId,
      },
      include: { patient: { select: { id: true, firstName: true, lastName: true } }, test: true },
    });

    await createAuditLog(req.user!.userId, 'CREATE_LAB_REPORT', 'LabReport', report.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, report, 'Lab report created');
  } catch (error) {
    next(error);
  }
};

export const updateLabReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Record<string, unknown> = { ...req.body };
    if (data.sampleCollectedAt) data.sampleCollectedAt = new Date(data.sampleCollectedAt as string);
    if (data.resultDate) data.resultDate = new Date(data.resultDate as string);

    const report = await prisma.labReport.update({ where: { id: req.params.id }, data });
    sendSuccess(res, report, 'Lab report updated');
  } catch (error) {
    next(error);
  }
};

export const deleteLabReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.labReport.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } });
    sendSuccess(res, null, 'Lab report cancelled');
  } catch (error) {
    next(error);
  }
};

export const verifyLabReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await prisma.labReport.update({
      where: { id: req.params.id },
      data: {
        status: 'VERIFIED',
        verifiedBy: req.user!.userId,
        verifiedAt: new Date(),
      },
    });
    sendSuccess(res, report, 'Lab report verified');
  } catch (error) {
    next(error);
  }
};

export const collectSample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await prisma.labReport.update({
      where: { id: req.params.id },
      data: {
        status: 'SAMPLE_COLLECTED',
        sampleCollectedAt: new Date(),
        sampleType: req.body.sampleType || undefined,
      },
    });
    sendSuccess(res, report, 'Sample collected');
  } catch (error) {
    next(error);
  }
};

export const uploadResults = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Record<string, unknown> = {
      results: req.body.results,
      status: 'COMPLETED',
      resultDate: new Date(),
    };
    if (req.file) data.fileUrl = req.file.path;

    const report = await prisma.labReport.update({
      where: { id: req.params.id },
      data,
    });
    sendSuccess(res, report, 'Results uploaded');
  } catch (error) {
    next(error);
  }
};

export const getPatientLabReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reports = await prisma.labReport.findMany({
      where: { patientId: req.params.patientId },
      orderBy: { createdAt: 'desc' },
      include: { test: true },
    });
    sendSuccess(res, reports);
  } catch (error) {
    next(error);
  }
};

export const getLabDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [totalTests, pendingTests, completedTests, todayTests] = await Promise.all([
      prisma.labTest.count({ where: { isActive: true } }),
      prisma.labReport.count({ where: { status: 'PENDING' } }),
      prisma.labReport.count({ where: { status: 'COMPLETED' } }),
      prisma.labReport.count({
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      }),
    ]);

    sendSuccess(res, { totalTests, pendingTests, completedTests, todayTests });
  } catch (error) {
    next(error);
  }
};
