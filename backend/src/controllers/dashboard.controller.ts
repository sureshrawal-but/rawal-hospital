import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess } from '../utils/apiResponse';

export const getAdminDashboard = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const [
      totalPatients, totalDoctors, totalStaff, totalDepartments,
      todayAppointments, totalAppointments,
      todayRevenue, monthlyRevenue, yearlyRevenue,
      pendingPayments, pendingLabReports,
      availableBeds, occupiedBeds, totalBeds,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count({ where: { isAvailable: true } }),
      prisma.staff.count({ where: { isActive: true } }),
      prisma.department.count({ where: { isActive: true } }),
      prisma.appointment.count({ where: { date: { gte: startOfDay } } }),
      prisma.appointment.count(),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PAID', receivedAt: { gte: startOfDay } } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PAID', receivedAt: { gte: startOfMonth } } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PAID', receivedAt: { gte: startOfYear } } }),
      prisma.invoice.count({ where: { status: { in: ['SENT', 'OVERDUE'] } } }),
      prisma.labReport.count({ where: { status: 'PENDING' } }),
      prisma.bed.count({ where: { isOccupied: false, isActive: true } }),
      prisma.bed.count({ where: { isOccupied: true, isActive: true } }),
      prisma.bed.count({ where: { isActive: true } }),
    ]);

    const doctorSpecializations = await prisma.doctor.groupBy({
      by: ['specialization'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const appointmentStatusCounts = await prisma.appointment.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const last7DaysRevenue = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.setHours(0, 0, 0, 0));
      const dayEnd = new Date(d.setHours(23, 59, 59, 999));
      const rev = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'PAID', receivedAt: { gte: dayStart, lte: dayEnd } },
      });
      last7DaysRevenue.push({
        date: dayStart.toISOString().split('T')[0],
        revenue: rev._sum?.amount || 0,
      });
    }

    sendSuccess(res, {
      stats: {
        totalPatients, totalDoctors, totalStaff, totalDepartments,
        totalAppointments, todayAppointments,
        todayRevenue: todayRevenue._sum?.amount || 0,
        monthlyRevenue: monthlyRevenue._sum?.amount || 0,
        yearlyRevenue: yearlyRevenue._sum?.amount || 0,
        pendingPayments, pendingLabReports,
        availableBeds, occupiedBeds, totalBeds,
      },
      doctorSpecializations,
      appointmentStatusCounts,
      revenueTrend: last7DaysRevenue,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user!.userId } });
    if (!doctor) { sendSuccess(res, { message: 'Doctor profile not found' }); return; }

    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

    const [
      todayAppointments, totalAppointments,
      completedAppointments, cancelledAppointments,
      totalPrescriptions, totalPatients,
    ] = await Promise.all([
      prisma.appointment.count({ where: { doctorId: doctor.id, date: { gte: startOfDay, lte: endOfDay } } }),
      prisma.appointment.count({ where: { doctorId: doctor.id } }),
      prisma.appointment.count({ where: { doctorId: doctor.id, status: 'COMPLETED' } }),
      prisma.appointment.count({ where: { doctorId: doctor.id, status: 'CANCELLED' } }),
      prisma.prescription.count({ where: { doctorId: doctor.id } }),
      prisma.appointment.groupBy({ by: ['patientId'], where: { doctorId: doctor.id }, _count: { patientId: true } }),
    ]);

    const todaySchedule = await prisma.appointment.findMany({
      where: { doctorId: doctor.id, date: { gte: startOfDay, lte: endOfDay } },
      orderBy: { startTime: 'asc' },
      include: { patient: { select: { id: true, firstName: true, lastName: true, phone: true, gender: true, registrationNo: true } } },
    });

    const recentPatients = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      orderBy: { date: 'desc' },
      take: 10,
      include: { patient: { select: { id: true, firstName: true, lastName: true, registrationNo: true, phone: true } } },
      distinct: ['patientId'],
    });

    sendSuccess(res, {
      stats: {
        todayAppointments, totalAppointments, completedAppointments,
        cancelledAppointments, totalPrescriptions, totalPatients: totalPatients.length,
      },
      todaySchedule,
      recentPatients: recentPatients.map((a) => a.patient),
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
    if (!patient) { sendSuccess(res, { message: 'Patient profile not found' }); return; }

    const [
      totalAppointments, upcomingAppointments, completedAppointments,
      totalPrescriptions, totalInvoices, paidInvoices, pendingInvoices,
      totalLabReports,
    ] = await Promise.all([
      prisma.appointment.count({ where: { patientId: patient.id } }),
      prisma.appointment.count({ where: { patientId: patient.id, date: { gte: new Date() }, status: { notIn: ['CANCELLED', 'NO_SHOW'] } } }),
      prisma.appointment.count({ where: { patientId: patient.id, status: 'COMPLETED' } }),
      prisma.prescription.count({ where: { patientId: patient.id } }),
      prisma.invoice.count({ where: { patientId: patient.id } }),
      prisma.invoice.count({ where: { patientId: patient.id, status: 'PAID' } }),
      prisma.invoice.count({ where: { patientId: patient.id, status: { in: ['SENT', 'OVERDUE'] } } }),
      prisma.labReport.count({ where: { patientId: patient.id } }),
    ]);

    const recentAppointments = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      orderBy: { date: 'desc' },
      take: 5,
      include: { doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } }, department: { select: { name: true } } },
    });

    sendSuccess(res, {
      stats: { totalAppointments, upcomingAppointments, completedAppointments, totalPrescriptions, totalInvoices, paidInvoices, pendingInvoices, totalLabReports },
      recentAppointments,
    });
  } catch (error) {
    next(error);
  }
};
