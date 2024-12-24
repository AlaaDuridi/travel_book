import dayjs from 'dayjs';
import { IRoom } from '../types/models/room.model.ts';

export const DEFAULT_SELECTED_HOTEL_ID: number = 260;

export const DEFAULT_CHECK_IN_DATE: string = dayjs(new Date()).format('YYYY-MM-DD');

export const DEFAULT_CHECK_OUT_DATE: string = dayjs(DEFAULT_CHECK_IN_DATE)
  .add(1, 'day')
  .format('YYYY-MM-DD');

export const INITIAL_ROOM: IRoom = {
  id: 0,
  hotelId: 0,
  roomNumber: 0,
  price: 0,
  roomType: '',
  roomPhotoUrl: '',
  capacityOfAdults: 0,
  capacityOfChildren: 0,
  availability: false,
  roomAmenities: [],
};

export enum AMENITY {
  FREE_WIFI = 'Free Wi-Fi',
  TV = 'TV',
  AIR_CONDITIONING = 'Air Conditioning',
  JACUZZI = 'Jacuzzi',
  MINI_BAR = 'Mini Bar',
  OCEAN_VIEW = 'Ocean View',
  KING_SIZE_BED = 'King Size Bed',
  CITY_VIEW = 'City View',
  ROOM_SERVICE = 'Room Service',
  BUDGET_FRIENDLY = 'Budget-Friendly',
  SINGLE_BED = 'Single Bed',
  ADJOINING_ROOMS = 'Adjoining Rooms',
  COMPLIMENTARY_BREAKFAST = 'Complimentary Breakfast',
  KITCHENETTE = 'Kitchenette',
  PLAY_AREA = 'Play Area',
  BUSINESS_CENTER_ACCESS = 'Business Center Access',
  MEETING_ROOM = 'Meeting Room',
}
