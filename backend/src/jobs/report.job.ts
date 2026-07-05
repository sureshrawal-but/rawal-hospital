import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';

const reportsDir = path.resolve(__dirname, '../../reports');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

export const generatePatientReport = async (patientId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          appointments: { include: { doctor: { select: { firstName: true, lastName: true, specialization: true } }, department: { select: { name: true } } }, orderBy: { date: 'desc' } },
          prescriptions: { orderBy: { createdAt: 'desc' } },
          labReports: { include: { test: true }, orderBy: { createdAt: 'desc' } },
          invoices: { orderBy: { createdAt: 'desc' } },
        },
      });

      if (!patient) throw new Error('Patient not found');

      const filename = `patient_${patient.registrationNo}_${Date.now()}.pdf`;
      const filepath = path.join(reportsDir, filename);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      doc.fontSize(20).font('Helvetica-Bold').text('Rawal Hospital', { align: 'center' });
      doc.fontSize(12).font('Helvetica').text('Patient Medical Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.moveDown(2);

      doc.fontSize(14).font('Helvetica-Bold').text('Patient Information');
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica');
      doc.text(`Name: ${patient.firstName} ${patient.lastName}`);
      doc.text(`Registration No: ${patient.registrationNo}`);
      doc.text(`Phone: ${patient.phone}`);
      doc.text(`Email: ${patient.email || 'N/A'}`);
      doc.text(`Gender: ${patient.gender || 'N/A'}`);
      doc.text(`Blood Group: ${patient.bloodGroup || 'N/A'}`);
      doc.text(`Address: ${patient.address || 'N/A'}, ${patient.city || ''} ${patient.state || ''}`);
      doc.moveDown(2);

      doc.fontSize(14).font('Helvetica-Bold').text('Appointments History');
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica');
      if (patient.appointments.length === 0) {
        doc.text('No appointments found.');
      } else {
        for (const apt of patient.appointments.slice(0, 10)) {
          doc.text(`${apt.date.toLocaleDateString()} | ${apt.startTime}-${apt.endTime} | ${apt.doctor.firstName} ${apt.doctor.lastName} (${apt.doctor.specialization}) | ${apt.status}`);
        }
      }
      doc.moveDown(2);

      doc.fontSize(14).font('Helvetica-Bold').text('Prescriptions');
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica');
      if (patient.prescriptions.length === 0) {
        doc.text('No prescriptions found.');
      } else {
        for (const pres of patient.prescriptions.slice(0, 10)) {
          doc.text(`${pres.createdAt.toLocaleDateString()} | Rx# ${pres.prescriptionNo} | Diagnosis: ${pres.diagnosis || 'N/A'}`);
        }
      }
      doc.moveDown(2);

      doc.fontSize(14).font('Helvetica-Bold').text('Lab Reports');
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica');
      if (patient.labReports.length === 0) {
        doc.text('No lab reports found.');
      } else {
        for (const report of patient.labReports.slice(0, 10)) {
          doc.text(`${report.createdAt.toLocaleDateString()} | ${report.test.name} | Status: ${report.status}`);
        }
      }
      doc.moveDown(2);

      doc.fontSize(14).font('Helvetica-Bold').text('Invoice Summary');
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica');
      if (patient.invoices.length === 0) {
        doc.text('No invoices found.');
      } else {
        let totalBilled = 0;
        let totalPaid = 0;
        for (const inv of patient.invoices) {
          totalBilled += inv.total;
          totalPaid += inv.paidAmount;
          doc.text(`INV# ${inv.invoiceNo} | ${inv.invoiceDate.toLocaleDateString()} | Total: Rs.${inv.total.toFixed(2)} | Paid: Rs.${inv.paidAmount.toFixed(2)} | ${inv.status}`);
        }
        doc.moveDown();
        doc.font('Helvetica-Bold').text(`Total Billed: Rs.${totalBilled.toFixed(2)} | Total Paid: Rs.${totalPaid.toFixed(2)} | Balance: Rs.${(totalBilled - totalPaid).toFixed(2)}`);
      }

      doc.moveDown(3);
      doc.fontSize(8).font('Helvetica').text('This is a computer-generated report from Rawal Hospital Management System.', { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(filename));
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};

export const generateRevenueReport = async (startDate: Date, endDate: Date): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          status: 'PAID',
          receivedAt: { gte: startDate, lte: endDate },
        },
        orderBy: { receivedAt: 'asc' },
      });

      const filename = `revenue_report_${Date.now()}.pdf`;
      const filepath = path.join(reportsDir, filename);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      doc.fontSize(20).font('Helvetica-Bold').text('Rawal Hospital', { align: 'center' });
      doc.fontSize(14).text('Revenue Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.moveDown(2);

      const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
      doc.fontSize(14).font('Helvetica-Bold').text(`Total Revenue: Rs.${totalRevenue.toFixed(2)}`);
      doc.moveDown();
      doc.fontSize(12).font('Helvetica-Bold').text('Payment Breakdown');
      doc.moveDown(0.5);

      doc.fontSize(9).font('Helvetica');
      for (const payment of payments) {
        doc.text(`${payment.receivedAt.toLocaleDateString()} | ${payment.paymentNo} | Rs.${payment.amount.toFixed(2)} | ${payment.paymentMode}`);
      }

      doc.moveDown(3);
      doc.fontSize(8).text('This is a computer-generated report from Rawal Hospital Management System.', { align: 'center' });
      doc.end();

      stream.on('finish', () => resolve(filename));
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};

export const generateAppointmentReport = async (startDate: Date, endDate: Date): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const appointments = await prisma.appointment.findMany({
        where: { date: { gte: startDate, lte: endDate } },
        include: {
          doctor: { select: { firstName: true, lastName: true, specialization: true } },
          department: { select: { name: true } },
        },
        orderBy: { date: 'asc' },
      });

      const filename = `appointment_report_${Date.now()}.pdf`;
      const filepath = path.join(reportsDir, filename);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      doc.fontSize(20).font('Helvetica-Bold').text('Rawal Hospital', { align: 'center' });
      doc.fontSize(14).text('Appointment Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, { align: 'center' });
      doc.moveDown(2);

      const scheduled = appointments.filter((a) => a.status === 'SCHEDULED').length;
      const completed = appointments.filter((a) => a.status === 'COMPLETED').length;
      const cancelled = appointments.filter((a) => a.status === 'CANCELLED').length;

      doc.fontSize(12).font('Helvetica-Bold').text(`Total Appointments: ${appointments.length}`);
      doc.fontSize(10).font('Helvetica').text(`Scheduled: ${scheduled}`);
      doc.text(`Completed: ${completed}`);
      doc.text(`Cancelled: ${cancelled}`);
      doc.moveDown(2);

      doc.fontSize(10).font('Helvetica');
      for (const apt of appointments.slice(0, 50)) {
        doc.text(`${apt.date.toLocaleDateString()} ${apt.startTime} | ${apt.doctor.firstName} ${apt.doctor.lastName} | ${apt.department.name} | ${apt.status}`);
      }

      doc.moveDown(3);
      doc.fontSize(8).text('This is a computer-generated report.', { align: 'center' });
      doc.end();

      stream.on('finish', () => resolve(filename));
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};
