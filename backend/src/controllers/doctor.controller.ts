import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { paginateParams, hashPassword } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getDoctors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { search, specialization, departmentId, isAvailable } = req.query;

    const where: Prisma.DoctorWhereInput = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { specialization: { contains: search as string, mode: 'insensitive' } },
        { employeeId: { contains: search as string } },
      ];
    }
    if (specialization) where.specialization = { contains: specialization as string, mode: 'insensitive' };
    if (departmentId) where.departmentId = departmentId as string;
    if (isAvailable !== undefined) where.isAvailable = isAvailable === 'true';

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ averageRating: 'desc' }, { firstName: 'asc' }],
        include: {
          department: { select: { id: true, name: true, color: true } },
          user: { select: { id: true, email: true, isActive: true } },
          _count: { select: { appointments: true, prescriptions: true } },
        },
      }),
      prisma.doctor.count({ where }),
    ]);

    sendPaginated(res, doctors, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
        user: { select: { id: true, email: true, isActive: true } },
        availability: true,
        timeOff: { where: { endDate: { gte: new Date() } }, orderBy: { startDate: 'asc' } },
        appointments: {
          take: 10,
          orderBy: { date: 'desc' },
          include: {
            patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
          },
        },
        _count: { select: { appointments: true, prescriptions: true } },
      },
    });

    if (!doctor) {
      sendError(res, 'Doctor not found', 404);
      return;
    }

    sendSuccess(res, doctor);
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, specialization, qualification, experienceYears, licenseNumber, designation, departmentId, phone, consultationFee, bio, education, experience, certifications, publications, maxPatientsPerDay } = req.body;

    const existing = await prisma.doctor.findUnique({ where: { licenseNumber } });
    if (existing) {
      sendError(res, 'License number already exists', 409);
      return;
    }

    const hashed = await hashPassword(password || 'doctor123');
    const user = await prisma.user.create({
      data: { email, password: hashed, role: 'DOCTOR' },
    });

    const count = await prisma.doctor.count();
    const doctor = await prisma.doctor.create({
      data: {
        userId: user.id,
        employeeId: `DOC${String(count + 1).padStart(5, '0')}`,
        firstName,
        lastName,
        specialization,
        qualification,
        experienceYears: experienceYears || 0,
        licenseNumber,
        designation,
        departmentId,
        phone,
        email,
        consultationFee: consultationFee || 0,
        bio,
        education: education || undefined,
        experience: experience || undefined,
        certifications: certifications || undefined,
        publications: publications || undefined,
        maxPatientsPerDay: maxPatientsPerDay || 20,
      },
      include: { department: true, user: { select: { id: true, email: true } } },
    });

    await createAuditLog(req.user!.userId, 'CREATE_DOCTOR', 'Doctor', doctor.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, doctor, 'Doctor created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.doctor.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 'Doctor not found', 404);
      return;
    }

    const doctor = await prisma.doctor.update({
      where: { id },
      data: req.body,
      include: { department: true },
    });

    await createAuditLog(req.user!.userId, 'UPDATE_DOCTOR', 'Doctor', id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, doctor, 'Doctor updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id } });
    if (!doctor) {
      sendError(res, 'Doctor not found', 404);
      return;
    }

    await prisma.user.update({
      where: { id: doctor.userId },
      data: { isActive: false },
    });
    await prisma.doctor.update({ where: { id: req.params.id }, data: { isAvailable: false } });

    await createAuditLog(req.user!.userId, 'DELETE_DOCTOR', 'Doctor', req.params.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, null, 'Doctor deactivated successfully');
  } catch (error) {
    next(error);
  }
};

export const getDoctorAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const availability = await prisma.doctorAvailability.findMany({
      where: { doctorId: req.params.id },
      orderBy: { day: 'asc' },
    });
    sendSuccess(res, availability);
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const slots = req.body.slots || req.body;

    if (Array.isArray(slots)) {
      await prisma.doctorAvailability.deleteMany({ where: { doctorId: id } });
      for (const slot of slots) {
        await prisma.doctorAvailability.create({
          data: {
            doctorId: id,
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
            slotDuration: slot.slotDuration || 30,
            isActive: slot.isActive !== undefined ? slot.isActive : true,
          },
        });
      }
    }

    const availability = await prisma.doctorAvailability.findMany({
      where: { doctorId: id },
      orderBy: { day: 'asc' },
    });

    await createAuditLog(req.user!.userId, 'UPDATE_AVAILABILITY', 'Doctor', id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, availability, 'Availability updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getDoctorTimeOff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const timeOff = await prisma.doctorTimeOff.findMany({
      where: { doctorId: req.params.id },
      orderBy: { startDate: 'asc' },
    });
    sendSuccess(res, timeOff);
  } catch (error) {
    next(error);
  }
};

export const createTimeOff = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate, reason } = req.body;

    const timeOff = await prisma.doctorTimeOff.create({
      data: {
        doctorId: id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });

    await createAuditLog(req.user!.userId, 'CREATE_TIME_OFF', 'Doctor', id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, timeOff, 'Time off created');
  } catch (error) {
    next(error);
  }
};

export const getDoctorsByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        departmentId: req.params.departmentId,
        isAvailable: true,
      },
      include: { department: { select: { id: true, name: true } } },
    });
    sendSuccess(res, doctors);
  } catch (error) {
    next(error);
  }
};
