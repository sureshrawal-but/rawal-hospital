import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createAppointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  doctorId: z.string().min(1, 'Doctor ID is required'),
  departmentId: z.string().min(1, 'Department ID is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  startTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
  endTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
  type: z.enum(['OPD', 'IPD', 'EMERGENCY', 'FOLLOW_UP', 'CONSULTATION']).optional().default('OPD'),
  reason: z.string().optional(),
  symptoms: z.string().optional(),
  notes: z.string().optional(),
  isEmergency: z.boolean().optional().default(false),
  isWalkIn: z.boolean().optional().default(false),
});

export const updateAppointmentSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format').optional(),
  startTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)').optional(),
  endTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)').optional(),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  reason: z.string().optional(),
  symptoms: z.string().optional(),
  notes: z.string().optional(),
});

export const cancelAppointmentSchema = z.object({
  reason: z.string().min(1, 'Cancellation reason is required'),
});

export const appointmentQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
  doctorId: z.string().optional(),
  patientId: z.string().optional(),
  departmentId: z.string().optional(),
  date: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.string().optional(),
});
