import api from './api';
import { TourAndTravel, ApiResponse } from '@/types';

class TourAndTravelService {
  async getAll(): Promise<ApiResponse<TourAndTravel[]>> {
    try {
      const response = await api.get('/tour-and-travel');
      return response.data;
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<ApiResponse<TourAndTravel>> {
    try {
      const response = await api.get(`/tour-and-travel/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tour package ${id}:`, error);
      throw error;
    }
  }
}

export const tourAndTravelService = new TourAndTravelService(); 