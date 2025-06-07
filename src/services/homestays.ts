import { ApiResponse, Homestay } from "@/types";
import api from "./api";

export const homestaysService = {
  getAll: async (): Promise<ApiResponse<Homestay[]>> => {
    try {
      const response = await api.get<ApiResponse<Homestay[]>>("/homestays");
      return response.data;
    } catch (error) {
      console.error("Error fetching homestays:", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<ApiResponse<Homestay>> => {
    try {
      const response = await api.get<ApiResponse<Homestay>>(`/homestays/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching homestay ${id}:`, error);
      throw error;
    }
  },
}; 