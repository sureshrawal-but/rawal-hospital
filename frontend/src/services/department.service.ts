import api from '@/lib/api';
import { Department } from '@/types';

export const departmentService = {
  async getDepartments(params?: any): Promise<Department[]> {
    const { data } = await api.get('/departments', { params });
    return data.data;
  },

  async getDepartment(slug: string): Promise<Department> {
    const { data } = await api.get(`/departments/${slug}`);
    return data.data;
  },
};
