import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';

export const getMedicalRecords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { patientId, doctorId } = req.query;

    const where: Record<string, unknown> = {};
    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;

    const [records, total] = await Promise.all([
      prisma.medicalRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true } },
          doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
          appointment: { select: { id: true, appointmentNo: true, date: true } },
        },
      }),
      prisma.medicalRecord.count({ where }),
    ]);

    sendPaginated(res, records, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const record = await prisma.medicalRecord.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, dateOfBirth: true, bloodGroup: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        appointment: { include: { department: { select: { id: true, name: true } } } },
      },
    });

    if (!record) { sendError(res, 'Medical record not found', 404); return; }
    sendSuccess(res, record);
  } catch (error) {
    next(error);
  }
};

export const createMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { appointmentId, patientId, doctorId, diagnosis, symptoms, treatment, notes, prescriptions, labOrders, followUpDate } = req.body;

    const existing = await prisma.medicalRecord.findUnique({ where: { appointmentId } });
    if (existing) {
      sendError(res, 'Medical record already exists for this appointment', 409);
      return;
    }

    const record = await prisma.medicalRecord.create({
      data: {
        appointmentId,
        patientId,
        doctorId,
        diagnosis,
        symptoms,
        treatment,
        notes,
        prescriptions: prescriptions || undefined,
        labOrders: labOrders || undefined,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
      },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true } },
        doctor: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'COMPLETED' },
    });

    await createAuditLog(req.user!.userId, 'CREATE_MEDICAL_RECORD', 'MedicalRecord', record.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, record, 'Medical record created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Record<string, unknown> = { ...req.body };
    if (data.followUpDate) data.followUpDate = new Date(data.followUpDate as string);

    const record = await prisma.medicalRecord.update({
      where: { id },
      data,
    });

    sendSuccess(res, record, 'Medical record updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.medicalRecord.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Medical record deleted');
  } catch (error) {
    next(error);
  }
};

export const getPatientRecords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await prisma.medicalRecord.findMany({
      where: { patientId: req.params.patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        appointment: { select: { id: true, appointmentNo: true, date: true, department: { select: { name: true } } } },
      },
    });
    sendSuccess(res, records);
  } catch (error) {
    next(error);
  }
};
