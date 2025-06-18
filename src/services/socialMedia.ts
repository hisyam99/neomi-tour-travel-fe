import { SocialMedia, ApiResponse } from "@/types";
import api from "./api";

class SocialMediaService {
  async getAll(): Promise<ApiResponse<SocialMedia[]>> {
    const response = await api.get<ApiResponse<SocialMedia[]>>("/social-media");
    return response.data;
  }
}

export const socialMediaService = new SocialMediaService();
