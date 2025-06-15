import { Rating, ApiResponse } from "@/types";
import api from "./api";

class RatingService {
  async getAll(): Promise<ApiResponse<Rating[]>> {
    const response = await api.get<ApiResponse<Rating[]>>("/ratings");
    return response.data;
  }
}

export const ratingService = new RatingService(); 