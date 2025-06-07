import api from './api';
import { Blog, ApiResponse } from '@/types';

export const blogService = {
  getAll: async (): Promise<ApiResponse<Blog[]>> => {
    const response = await api.get('/blogs');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },
}; 