import api from '@/lib/api';
import { Appointment, PaginatedResponse, Slot } from '@/types';

export const appointmentService = {
  async getAppointments(params?: any): Promise<PaginatedResponse<Appointment>> {
    const { data } = await api.get('/appointments', { params });
    return data.data;
  },

  async createAppointment(appointmentData: any): Promise<Appointment> {
    const { data } = await api.post('/appointments', appointmentData);
    return data.data;
  },

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const { data } = await api.put(`/appointments/${id}/status`, { status });
    return data.data;
  },

  async getSlots(doctorId: string, date: string): Promise<Slot[]> {
    const { data } = await api.get(`/appointments/slots`, { params: { doctorId, date } });
    return data.data;
  },
};
