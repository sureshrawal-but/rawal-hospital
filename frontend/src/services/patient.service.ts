import api from '@/lib/api';
import { Patient, PaginatedResponse } from '@/types';

export const patientService = {
  async getPatients(params?: any): Promise<PaginatedResponse<Patient>> {
    const { data } = await api.get('/patients', { params });
    return data.data;
  },

  async getPatient(id: string): Promise<Patient> {
    const { data } = await api.get(`/patients/${id}`);
    return data.data;
  },

  async createPatient(patientData: any): Promise<Patient> {
    const { data } = await api.post('/patients', patientData);
    return data.data;
  },

  async updatePatient(id: string, patientData: any): Promise<Patient> {
    const { data } = await api.put(`/patients/${id}`, patientData);
    return data.data;
  },
};
