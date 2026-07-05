import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

const loadTemplate = (templateName: string): HandlebarsTemplateDelegate => {
  const templatePath = path.resolve(__dirname, '../../templates', `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, 'utf-8');
  return Handlebars.compile(source);
};

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  context: Record<string, unknown>,
): Promise<void> => {
  try {
    const template = loadTemplate(templateName);
    const html = template(context);

    await transporter.sendMail({
      from: `"Rawal Hospital" <${config.smtp.from}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  firstName: string,
): Promise<void> => {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
  await sendEmail(email, 'Password Reset - Rawal Hospital', 'password-reset', {
    firstName,
    resetUrl,
    email,
    year: new Date().getFullYear(),
  });
};

export const sendAppointmentConfirmation = async (
  email: string,
  patientName: string,
  doctorName: string,
  date: string,
  time: string,
  appointmentNo: string,
): Promise<void> => {
  await sendEmail(email, 'Appointment Confirmation - Rawal Hospital', 'appointment-confirmation', {
    patientName,
    doctorName,
    date,
    time,
    appointmentNo,
    hospitalName: 'Rawal Hospital',
    year: new Date().getFullYear(),
  });
};

export const sendInvoiceEmail = async (
  email: string,
  patientName: string,
  invoiceNo: string,
  amount: number,
  dueDate: string,
): Promise<void> => {
  await sendEmail(email, `Invoice ${invoiceNo} - Rawal Hospital`, 'invoice', {
    patientName,
    invoiceNo,
    amount: amount.toFixed(2),
    dueDate,
    hospitalName: 'Rawal Hospital',
    year: new Date().getFullYear(),
  });
};

export const verifyTransporter = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    logger.info('Email transporter is ready');
    return true;
  } catch (error) {
    logger.error('Email transporter verification failed:', error);
    return false;
  }
};
