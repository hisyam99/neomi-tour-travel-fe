export interface Rating {
  id: number;
  name: string;
  description: string;
  foto: string;
  created_at: string;
  updated_at: string;
}

export interface SocialMedia {
  id: number;
  tiktok: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  created_at: string | null;
  updated_at: string;
}

export interface HomestayFacility {
  id: number;
  name: string;
  icon: string;
}

export interface HomestayRule {
  id: number;
  name: string;
}

export interface HomestayPhoto {
  id: number;
  path: string;
}

export interface HomestayDetail {
  type: string;
  chat: string;
  chat_url: string;
  max_guest: number;
  price: string;
  slug: string;
  size: string;
  Min_Price: string;
  Max_Price: string;
  facilities: HomestayFacility[];
  rules: HomestayRule[];
  photos: HomestayPhoto[];
}

export interface Homestay {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  details: HomestayDetail;
}

export interface Itinerary {
  id: number;
  days: string;
  details: string;
}

export interface TourAndTravelPhoto {
  url: string;
}

export interface TourAndTravelDetail {
  id: number;
  duration: string;
  detail_wte: string;
  slug: string;
  chat: string;
  chat_url: string;
  link_route_maps: string;
  price: string;
  photos: TourAndTravelPhoto[];
  itineraries: Itinerary[];
}

export interface TourAndTravel {
  id: number;
  name_package: string;
  description: string;
  details: TourAndTravelDetail[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  meta: {
    timestamp: string;
    request_id: string;
  };
  min_price?: string;
  max_price?: string;
}
