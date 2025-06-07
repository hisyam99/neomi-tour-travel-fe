import api from './api';
import { Rating } from '@/types';

export const ratingsService = {
  getAll: async (): Promise<Rating[]> => {
    const response = await api.get('/ratings');
    return response.data;
  },

  getById: async (id: number): Promise<Rating> => {
    const response = await api.get(`/ratings/${id}`);
    return response.data;
  },
}; 