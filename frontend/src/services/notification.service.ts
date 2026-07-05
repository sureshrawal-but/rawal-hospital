import api from '@/lib/api';
import { Notification, PaginatedResponse } from '@/types';

export const notificationService = {
  async getNotifications(params?: any): Promise<PaginatedResponse<Notification>> {
    const { data } = await api.get('/notifications', { params });
    return data.data;
  },

  async markAsRead(id: string): Promise<Notification> {
    const { data } = await api.put(`/notifications/${id}/read`);
    return data.data;
  },

  async markAllAsRead(): Promise<void> {
    await api.put('/notifications/read-all');
  },
};
