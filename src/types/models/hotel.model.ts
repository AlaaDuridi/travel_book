import { IRoom, IRoomAmenity } from './room.model.ts';

export interface IHotel {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export interface IHotelDetails {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: IRoomAmenity[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: string;
}

export interface IHotelGallery {
  id: string;
  url: string;
}

export interface IHotelReview {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}

export interface IHotelData {
  details: IHotelDetails;
  reviews: IHotelReview[];
  rooms: IRoom[];
}
