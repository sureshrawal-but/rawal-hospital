import api from '@/lib/api';
import { LabTest, LabReport, PaginatedResponse } from '@/types';

export const laboratoryService = {
  async getTests(params?: any): Promise<PaginatedResponse<LabTest>> {
    const { data } = await api.get('/laboratory/tests', { params });
    return data.data;
  },

  async getReports(params?: any): Promise<PaginatedResponse<LabReport>> {
    const { data } = await api.get('/laboratory/reports', { params });
    return data.data;
  },

  async createReport(reportData: any): Promise<LabReport> {
    const { data } = await api.post('/laboratory/reports', reportData);
    return data.data;
  },
};
