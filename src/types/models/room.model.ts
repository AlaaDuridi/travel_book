export interface IRoom {
  id: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: IRoomType;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
  roomAmenities: IRoomAmenity[];

  hotelId: number;
}

export interface IRoomAmenity {
  id?: number;
  name: string;
  description: string;
}

export enum ROOM_TYPES {
  SUITE = 'Suite',
  STANDARD = 'Standard',
  DELUXE = 'Deluxe',
  ECONOMY = 'Economy',
  FAMILY_SUITE = 'Family Suite',
  EXECUTIVE_SUITE = 'Executive Suite',
}

export type IRoomType =
  | 'Suite'
  | 'Standard'
  | 'Deluxe'
  | 'Economy'
  | 'Family Suite'
  | 'Executive Suite'
  | string;

export enum ISortBy {
  PRICE = 'Price',
  RATING = 'Rating',
}
