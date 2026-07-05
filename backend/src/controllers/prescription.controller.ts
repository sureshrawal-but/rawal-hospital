import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getPrescriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { patientId, doctorId, isActive } = req.query;

    const where: Record<string, unknown> = {};
    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const [prescriptions, total] = await Promise.all([
      prisma.prescription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true } },
          doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        },
      }),
      prisma.prescription.count({ where }),
    ]);

    sendPaginated(res, prescriptions, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getPrescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const prescription = await prisma.prescription.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, dateOfBirth: true, bloodGroup: true, phone: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true, qualification: true, licenseNumber: true, department: { select: { name: true } } } },
      },
    });

    if (!prescription) { sendError(res, 'Prescription not found', 404); return; }
    sendSuccess(res, prescription);
  } catch (error) {
    next(error);
  }
};

export const createPrescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, doctorId, diagnosis, medicines, labTests, notes, followUpDate } = req.body;

    const count = await prisma.prescription.count();
    const prescription = await prisma.prescription.create({
      data: {
        prescriptionNo: `PRE${String(count + 1).padStart(6, '0')}`,
        patientId,
        doctorId,
        diagnosis,
        medicines,
        labTests: labTests || undefined,
        notes,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
      },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
      },
    });

    if (labTests && Array.isArray(labTests)) {
      for (const test of labTests) {
        const labTest = await prisma.labTest.findFirst({ where: { name: { contains: test, mode: 'insensitive' } } });
        if (labTest) {
          await prisma.labReport.create({
            data: {
              reportNo: `LAB${String(await prisma.labReport.count() + 1).padStart(6, '0')}`,
              patientId,
              testId: labTest.id,
              doctorId,
              prescribedBy: req.user!.userId,
              createdBy: req.user!.userId,
            },
          });
        }
      }
    }

    await createAuditLog(req.user!.userId, 'CREATE_PRESCRIPTION', 'Prescription', prescription.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, prescription, 'Prescription created successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePrescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Record<string, unknown> = { ...req.body };
    if (data.followUpDate) data.followUpDate = new Date(data.followUpDate as string);

    const prescription = await prisma.prescription.update({
      where: { id },
      data,
    });

    sendSuccess(res, prescription, 'Prescription updated');
  } catch (error) {
    next(error);
  }
};

export const deletePrescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.prescription.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Prescription deleted');
  } catch (error) {
    next(error);
  }
};

export const getPatientPrescriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: req.params.patientId, isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
      },
    });
    sendSuccess(res, prescriptions);
  } catch (error) {
    next(error);
  }
};

export const printPrescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const prescription = await prisma.prescription.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, dateOfBirth: true, bloodGroup: true, phone: true, address: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true, qualification: true, licenseNumber: true, consultationFee: true, department: { select: { name: true } } } },
      },
    });

    if (!prescription) { sendError(res, 'Prescription not found', 404); return; }
    sendSuccess(res, prescription);
  } catch (error) {
    next(error);
  }
};
