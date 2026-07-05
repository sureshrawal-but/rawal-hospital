import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getAdmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status, patientId, doctorId } = req.query;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { admissionDate: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true, gender: true } },
          doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        },
      }),
      prisma.admission.count({ where }),
    ]);

    sendPaginated(res, admissions, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getAdmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admission = await prisma.admission.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, dateOfBirth: true, gender: true, bloodGroup: true, phone: true, address: true, city: true, emergencyContactName: true, emergencyContactPhone: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true, phone: true } },
      },
    });
    if (!admission) { sendError(res, 'Admission not found', 404); return; }
    sendSuccess(res, admission);
  } catch (error) {
    next(error);
  }
};

export const createAdmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, doctorId, roomNo, bedNo, ward, diagnosis, treatment, notes } = req.body;

    const count = await prisma.admission.count();
    const admission = await prisma.admission.create({
      data: {
        admissionNo: `ADM${String(count + 1).padStart(6, '0')}`,
        patientId,
        doctorId,
        roomNo,
        bedNo,
        ward,
        diagnosis,
        treatment,
        notes,
        createdBy: req.user!.userId,
      },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true } },
        doctor: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    if (bedNo && ward) {
      await prisma.bed.updateMany({
        where: { bedNo, ward, isActive: true },
        data: { isOccupied: true },
      });
    }

    await createAuditLog(req.user!.userId, 'CREATE_ADMISSION', 'Admission', admission.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, admission, 'Patient admitted successfully');
  } catch (error) {
    next(error);
  }
};

export const updateAdmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admission = await prisma.admission.update({
      where: { id: req.params.id },
      data: req.body,
    });
    sendSuccess(res, admission, 'Admission updated');
  } catch (error) {
    next(error);
  }
};

export const dischargePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admission = await prisma.admission.findUnique({ where: { id: req.params.id } });
    if (!admission) { sendError(res, 'Admission not found', 404); return; }
    if (admission.status === 'DISCHARGED') { sendError(res, 'Patient already discharged', 400); return; }

    const updated = await prisma.admission.update({
      where: { id: req.params.id },
      data: { status: 'DISCHARGED', dischargeDate: new Date() },
    });

    if (admission.bedNo && admission.ward) {
      await prisma.bed.updateMany({
        where: { bedNo: admission.bedNo, ward: admission.ward },
        data: { isOccupied: false },
      });
    }

    await createAuditLog(req.user!.userId, 'DISCHARGE_PATIENT', 'Admission', req.params.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, updated, 'Patient discharged successfully');
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admissions = await prisma.admission.findMany({
      where: { status: 'ADMITTED' },
      orderBy: { admissionDate: 'desc' },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true, gender: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
      },
    });
    sendSuccess(res, admissions);
  } catch (error) {
    next(error);
  }
};

export const getAdmissionStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [totalAdmissions, currentAdmissions, dischargedToday, averageStay] = await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: 'ADMITTED' } }),
      prisma.admission.count({
        where: {
          status: 'DISCHARGED',
          dischargeDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.admission.findMany({
        where: { status: 'DISCHARGED', dischargeDate: { not: null } },
        select: { admissionDate: true, dischargeDate: true },
      }),
    ]);

    let avgStayDays = 0;
    if (averageStay.length > 0) {
      const totalDays = averageStay.reduce((sum, a) => {
        const diff = (a.dischargeDate!.getTime() - a.admissionDate.getTime()) / (1000 * 60 * 60 * 24);
        return sum + diff;
      }, 0);
      avgStayDays = Math.round((totalDays / averageStay.length) * 10) / 10;
    }

    sendSuccess(res, { totalAdmissions, currentAdmissions, dischargedToday, averageStay: avgStayDays });
  } catch (error) {
    next(error);
  }
};
