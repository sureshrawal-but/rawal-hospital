import api from '@/lib/api';
import { Invoice, PaginatedResponse } from '@/types';

export const invoiceService = {
  async getInvoices(params?: any): Promise<PaginatedResponse<Invoice>> {
    const { data } = await api.get('/invoices', { params });
    return data.data;
  },

  async getInvoice(id: string): Promise<Invoice> {
    const { data } = await api.get(`/invoices/${id}`);
    return data.data;
  },

  async createInvoice(invoiceData: any): Promise<Invoice> {
    const { data } = await api.post('/invoices', invoiceData);
    return data.data;
  },
};
