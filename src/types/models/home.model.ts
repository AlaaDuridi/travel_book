import { IRoomAmenity, IRoomType } from './room.model.ts';

export interface IHomeSearchRequestParams {
  city?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfRooms?: number;
  adults?: number;
  children?: number;
  sort?: string;
  starRate?: number;
}

export interface IHomeResult {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: IRoomType;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: IRoomAmenity[];
}

export interface IFeaturedDeal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface ITrendingDestination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export interface IRecentlyVisitedHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}
