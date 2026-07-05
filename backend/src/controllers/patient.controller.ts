import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError, sendCreated, sendPaginated } from '../utils/apiResponse';
import { hashPassword, paginateParams } from '../utils/helpers';
import { createAuditLog } from '../middleware/audit';
import { Prisma } from '@prisma/client';

export const getPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = paginateParams(req.query as { page?: string; limit?: string });
    const { search, gender, bloodGroup, city } = req.query;

    const where: Prisma.PatientWhereInput = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { phone: { contains: search as string } },
        { registrationNo: { contains: search as string } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (gender) where.gender = gender as string as any;
    if (bloodGroup) where.bloodGroup = bloodGroup as string as any;
    if (city) where.city = { contains: city as string, mode: 'insensitive' };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, email: true, isActive: true } },
          _count: { select: { appointments: true, invoices: true, prescriptions: true, labReports: true } },
        },
      }),
      prisma.patient.count({ where }),
    ]);

    sendPaginated(res, patients, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, email: true, isActive: true, createdAt: true } },
        appointments: {
          include: { doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } }, department: { select: { id: true, name: true } } },
          orderBy: { date: 'desc' },
          take: 10,
        },
        invoices: { orderBy: { createdAt: 'desc' }, take: 10 },
        prescriptions: { orderBy: { createdAt: 'desc' }, take: 10 },
        labReports: {
          include: { test: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        admissions: { orderBy: { createdAt: 'desc' }, take: 5 },
        _count: { select: { appointments: true, invoices: true, prescriptions: true, labReports: true, admissions: true } },
      },
    });

    if (!patient) {
      sendError(res, 'Patient not found', 404);
      return;
    }

    sendSuccess(res, patient);
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, bloodGroup, phone, alternatePhone, address, city, state, pincode, country, occupation, emergencyContactName, emergencyContactPhone, medicalHistory, allergies, chronicDiseases } = req.body;

    let userId = req.user!.userId;
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        sendError(res, 'Email already in use', 409);
        return;
      }
      const hashed = password ? await hashPassword(password) : await hashPassword('patient123');
      const user = await prisma.user.create({
        data: { email, password: hashed, role: 'PATIENT' },
      });
      userId = user.id;
    }

    const count = await prisma.patient.count();
    const patient = await prisma.patient.create({
      data: {
        userId,
        registrationNo: `RAW${String(count + 1).padStart(6, '0')}`,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        bloodGroup,
        phone,
        alternatePhone,
        address,
        city,
        state,
        pincode,
        country: country || 'India',
        occupation,
        emergencyContactName,
        emergencyContactPhone,
        medicalHistory: medicalHistory || undefined,
        allergies,
        chronicDiseases,
      },
      include: { user: { select: { id: true, email: true } } },
    });

    await createAuditLog(req.user!.userId, 'CREATE_PATIENT', 'Patient', patient.id, {}, req.ip, req.headers['user-agent']);
    sendCreated(res, patient, 'Patient created successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.patient.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 'Patient not found', 404);
      return;
    }

    const { firstName, lastName, dateOfBirth, gender, bloodGroup, phone, alternatePhone, address, city, state, pincode, country, occupation, emergencyContactName, emergencyContactPhone, medicalHistory, allergies, chronicDiseases } = req.body;

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        ...(gender && { gender }),
        ...(bloodGroup && { bloodGroup }),
        ...(phone && { phone }),
        ...(alternatePhone !== undefined && { alternatePhone }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(pincode !== undefined && { pincode }),
        ...(country !== undefined && { country }),
        ...(occupation !== undefined && { occupation }),
        ...(emergencyContactName !== undefined && { emergencyContactName }),
        ...(emergencyContactPhone !== undefined && { emergencyContactPhone }),
        ...(medicalHistory !== undefined && { medicalHistory }),
        ...(allergies !== undefined && { allergies }),
        ...(chronicDiseases !== undefined && { chronicDiseases }),
      },
    });

    await createAuditLog(req.user!.userId, 'UPDATE_PATIENT', 'Patient', id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, patient, 'Patient updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: req.params.id } });
    if (!patient) {
      sendError(res, 'Patient not found', 404);
      return;
    }

    await prisma.user.update({
      where: { id: patient.userId },
      data: { isActive: false },
    });

    await createAuditLog(req.user!.userId, 'DELETE_PATIENT', 'Patient', req.params.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, null, 'Patient deactivated successfully');
  } catch (error) {
    next(error);
  }
};

export const searchPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q) {
      sendError(res, 'Search query is required', 400);
      return;
    }

    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: q as string, mode: 'insensitive' } },
          { lastName: { contains: q as string, mode: 'insensitive' } },
          { phone: { contains: q as string } },
          { registrationNo: { contains: q as string } },
          { email: { contains: q as string, mode: 'insensitive' } },
        ],
      },
      take: 20,
      select: {
        id: true,
        registrationNo: true,
        firstName: true,
        lastName: true,
        phone: true,
        gender: true,
        bloodGroup: true,
        city: true,
      },
    });

    sendSuccess(res, patients);
  } catch (error) {
    next(error);
  }
};
