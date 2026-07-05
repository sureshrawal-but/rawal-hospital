import { z } from 'zod';

export const createLabTestSchema = z.object({
  name: z.string().min(1, 'Test name is required'),
  category: z.string().optional(),
  description: z.string().optional(),
  preparation: z.string().optional(),
  sampleType: z.string().optional(),
  turnaroundTime: z.string().optional(),
  cost: z.number().min(0, 'Cost must be positive'),
});

export const updateLabTestSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  preparation: z.string().optional(),
  sampleType: z.string().optional(),
  turnaroundTime: z.string().optional(),
  cost: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const createLabReportSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  testId: z.string().min(1, 'Test ID is required'),
  appointmentId: z.string().optional(),
  doctorId: z.string().optional(),
  prescribedBy: z.string().optional(),
  sampleType: z.string().optional(),
  notes: z.string().optional(),
});

export const updateLabReportSchema = z.object({
  results: z.any().optional(),
  status: z.enum(['PENDING', 'SAMPLE_COLLECTED', 'PROCESSING', 'COMPLETED', 'VERIFIED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
  sampleCollectedAt: z.string().optional(),
  resultDate: z.string().optional(),
  fileUrl: z.string().optional(),
});

export const verifyLabReportSchema = z.object({
  verifiedBy: z.string().min(1, 'Verified by is required'),
});

export const labQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
  patientId: z.string().optional(),
  testId: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
});
