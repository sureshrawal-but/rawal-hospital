import api from '@/lib/api';
import { BlogPost, PaginatedResponse } from '@/types';

export const blogService = {
  async getPosts(params?: any): Promise<PaginatedResponse<BlogPost>> {
    const { data } = await api.get('/blog', { params });
    return data.data;
  },

  async getPost(slug: string): Promise<BlogPost> {
    const { data } = await api.get(`/blog/${slug}`);
    return data.data;
  },
};
