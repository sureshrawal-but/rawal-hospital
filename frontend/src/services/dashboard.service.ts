import api from '@/lib/api';
import { DashboardStats } from '@/types';

export const dashboardService = {
  async getAdminDashboard(): Promise<{ stats: DashboardStats; charts: any }> {
    const { data } = await api.get('/dashboard/admin');
    return data.data;
  },

  async getDoctorDashboard(): Promise<{ stats: any; appointments: any[] }> {
    const { data } = await api.get('/dashboard/doctor');
    return data.data;
  },

  async getPatientDashboard(): Promise<{ stats: any; records: any[] }> {
    const { data } = await api.get('/dashboard/patient');
    return data.data;
  },
};
