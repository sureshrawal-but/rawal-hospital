import api from '@/lib/api';
import { Doctor, PaginatedResponse } from '@/types';

export const doctorService = {
  async getDoctors(params?: any): Promise<PaginatedResponse<Doctor>> {
    const { data } = await api.get('/doctors', { params });
    return data.data;
  },

  async getDoctor(id: string): Promise<Doctor> {
    const { data } = await api.get(`/doctors/${id}`);
    return data.data;
  },

  async getDoctorAvailability(doctorId: string): Promise<any> {
    const { data } = await api.get(`/doctors/${doctorId}/availability`);
    return data.data;
  },

  async updateAvailability(doctorId: string, availability: any): Promise<any> {
    const { data } = await api.put(`/doctors/${doctorId}/availability`, availability);
    return data.data;
  },
};
