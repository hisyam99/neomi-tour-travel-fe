import api from './api';
import { Blog } from '@/types';

export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data;
  },

  getById: async (id: number): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
}; 