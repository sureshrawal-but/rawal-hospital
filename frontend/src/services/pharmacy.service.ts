import api from '@/lib/api';
import { Medicine, PaginatedResponse } from '@/types';

export const pharmacyService = {
  async getMedicines(params?: any): Promise<PaginatedResponse<Medicine>> {
    const { data } = await api.get('/pharmacy/medicines', { params });
    return data.data;
  },

  async createSale(saleData: any): Promise<any> {
    const { data } = await api.post('/pharmacy/sales', saleData);
    return data.data;
  },

  async getSales(params?: any): Promise<PaginatedResponse<any>> {
    const { data } = await api.get('/pharmacy/sales', { params });
    return data.data;
  },

  async getInventory(params?: any): Promise<PaginatedResponse<Medicine>> {
    const { data } = await api.get('/pharmacy/inventory', { params });
    return data.data;
  },
};
