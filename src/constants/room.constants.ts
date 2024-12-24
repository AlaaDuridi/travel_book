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
