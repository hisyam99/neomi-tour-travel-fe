import api from './api';
import { TourAndTravel } from '@/types';

export const tourAndTravelService = {
  getAll: async (): Promise<TourAndTravel[]> => {
    const response = await api.get('/tour-and-travel');
    return response.data;
  },

  getById: async (id: number): Promise<TourAndTravel> => {
    const response = await api.get(`/tour-and-travel/${id}`);
    return response.data;
  },
}; 