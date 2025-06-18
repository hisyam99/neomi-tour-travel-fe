import api from "./api";
import { Homestay, ApiResponse } from "@/types";

class HomestayService {
  async getAll(): Promise<ApiResponse<Homestay[]>> {
    try {
      const response = await api.get("/homestays");
      return response.data;
    } catch (error) {
      console.error("Error fetching homestays:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<ApiResponse<Homestay>> {
    try {
      const response = await api.get(`/homestays/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching homestay with ID ${id}:`, error);
      throw error;
    }
  }
}

export const homestaysService = new HomestayService();
