import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { status, doctorId, patientId, departmentId, date, startDate, endDate, type } = req.query;

    const where: Prisma.AppointmentWhereInput = {};
    if (status) where.status = status as string as any;
    if (doctorId) where.doctorId = doctorId as string;
    if (patientId) where.patientId = patientId as string;
    if (departmentId) where.departmentId = departmentId as string;
    if (type) where.type = type as string;
    if (date) {
      const d = new Date(date as string);
      where.date = { gte: new Date(d.setHours(0, 0, 0, 0)), lte: new Date(d.setHours(23, 59, 59, 999)) };
    }
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate as string), lte: new Date(endDate as string) };
    }

    if (req.user!.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
      if (patient) where.patientId = patient.id;
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          patient: { select: { id: true, firstName: true, lastName: true, phone: true, gender: true, registrationNo: true } },
          doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
          department: { select: { id: true, name: true } },
          medicalRecord: { select: { id: true, diagnosis: true } },
          invoice: { select: { id: true, invoiceNo: true, status: true, total: true } },
        },
      }),
      prisma.appointment.count({ where }),
    ]);

    sendPaginated(res, appointments, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: req.params.id },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, phone: true, gender: true, dateOfBirth: true, bloodGroup: true, registrationNo: true, address: true, city: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true, qualification: true, consultationFee: true, profileImage: true } },
        department: { select: { id: true, name: true, color: true } },
        medicalRecord: true,
        invoice: { include: { items: true } },
      },
    });

    if (!appointment) {
      sendError(res, 'Appointment not found', 404);
      return;
    }

    sendSuccess(res, appointment);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId, doctorId, departmentId, date, startTime, endTime, type, reason, symptoms, notes, isEmergency, isWalkIn } = req.body;

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) { sendError(res, 'Doctor not found', 404); return; }
    if (!doctor.isAvailable) { sendError(res, 'Doctor is not available', 400); return; }

    const count = await prisma.appointment.count();
    const appointmentDate = new Date(date);

    const appointment = await prisma.appointment.create({
      data: {
        appointmentNo: `APT${String(count + 1).padStart(6, '0')}`,
        patientId,
        doctorId,
        departmentId,
        date: appointmentDate,
        startTime,
        endTime,
        type: type || 'OPD',
        reason,
        symptoms,
        notes,
        isEmergency: isEmergency || false,
        isWalkIn: isWalkIn || false,
        consultationFee: doctor.consultationFee,
        createdBy: req.user!.userId,
      },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        department: { select: { id: true, name: true } },
      },
    });

    await createAuditLog(req.user!.userId, 'CREATE_APPOINTMENT', 'Appointment', appointment.id, {}, req.ip, req.headers['user-agent']);

    await prisma.notification.create({
      data: {
        userId: doctor.userId,
        title: 'New Appointment',
        message: `New appointment scheduled on ${appointmentDate.toLocaleDateString()} at ${startTime}`,
        type: 'APPOINTMENT',
        link: `/appointments/${appointment.id}`,
      },
    });

    sendCreated(res, appointment, 'Appointment created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) { sendError(res, 'Appointment not found', 404); return; }

    const data: Record<string, unknown> = { ...req.body };
    if (data.date) data.date = new Date(data.date as string);

    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: {
        patient: { select: { id: true, firstName: true, lastName: true } },
        doctor: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    await createAuditLog(req.user!.userId, 'UPDATE_APPOINTMENT', 'Appointment', id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, appointment, 'Appointment updated successfully');
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) { sendError(res, 'Appointment not found', 404); return; }
    if (existing.status === 'CANCELLED' || existing.status === 'COMPLETED') {
      sendError(res, `Appointment is already ${existing.status.toLowerCase()}`, 400);
      return;
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelReason: reason,
        cancelledBy: req.user!.userId,
      },
    });

    await createAuditLog(req.user!.userId, 'CANCEL_APPOINTMENT', 'Appointment', id, { reason }, req.ip, req.headers['user-agent']);
    sendSuccess(res, appointment, 'Appointment cancelled successfully');
  } catch (error) {
    next(error);
  }
};

export const getTodayAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const where: Prisma.AppointmentWhereInput = {
      date: { gte: startOfDay, lte: endOfDay },
    };

    if (req.user!.role === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({ where: { userId: req.user!.userId } });
      if (doctor) where.doctorId = doctor.id;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, phone: true, gender: true, registrationNo: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
      },
    });

    sendSuccess(res, appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date } = req.params;
    const d = new Date(date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));

    const appointments = await prisma.appointment.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: { startTime: 'asc' },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, phone: true, registrationNo: true } },
        doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
        department: { select: { id: true, name: true } },
      },
    });

    sendSuccess(res, appointments);
  } catch (error) {
    next(error);
  }
};

export const checkInAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) { sendError(res, 'Appointment not found', 404); return; }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: 'CHECKED_IN' },
    });

    sendSuccess(res, updated, 'Patient checked in');
  } catch (error) {
    next(error);
  }
};

export const completeAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) { sendError(res, 'Appointment not found', 404); return; }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });

    sendSuccess(res, updated, 'Appointment completed');
  } catch (error) {
    next(error);
  }
};
