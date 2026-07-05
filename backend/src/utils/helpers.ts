import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (length = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateNumericToken = (length = 6): string => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

export const generateEmployeeId = (prefix: string, sequence: number): string => {
  return `${prefix}${String(sequence).padStart(5, '0')}`;
};

export const generateRegistrationNo = (sequence: number): string => {
  return `RAW${String(sequence).padStart(6, '0')}`;
};

export const generateInvoiceNo = (prefix: string, sequence: number): string => {
  const year = new Date().getFullYear();
  return `${prefix}${year}${String(sequence).padStart(5, '0')}`;
};

export const generateAppointmentNo = (sequence: number): string => {
  return `APT${String(sequence).padStart(6, '0')}`;
};

export const generatePrescriptionNo = (sequence: number): string => {
  return `PRE${String(sequence).padStart(6, '0')}`;
};

export const generateReportNo = (sequence: number): string => {
  return `LAB${String(sequence).padStart(6, '0')}`;
};

export const generateAdmissionNo = (sequence: number): string => {
  return `ADM${String(sequence).padStart(6, '0')}`;
};

export const generatePaymentNo = (sequence: number): string => {
  return `PAY${String(sequence).padStart(6, '0')}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

export const calculateAge = (dateOfBirth: Date): { years: number; months: number; days: number } => {
  const now = new Date();
  let years = now.getFullYear() - dateOfBirth.getFullYear();
  let months = now.getMonth() - dateOfBirth.getMonth();
  let days = now.getDate() - dateOfBirth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
};

export const paginateParams = (query: {
  page?: string;
  limit?: string;
}): { page: number; limit: number; skip: number } => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
};

export const sanitizeUser = (user: Record<string, unknown>) => {
  const { password, refreshToken, resetToken, resetTokenExp, verificationToken, ...sanitized } = user;
  return sanitized;
};
