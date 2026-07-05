import api from '@/lib/api';
import { AuthResponse, User } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data;
  },

  async register(userData: any): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', userData);
    return data.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { data } = await api.post('/auth/refresh-token', { refreshToken });
    return data.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data.data;
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/reset-password', { token, password });
    return data.data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const { data } = await api.put('/auth/profile', profileData);
    return data.data;
  },
};
