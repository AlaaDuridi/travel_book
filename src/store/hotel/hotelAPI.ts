import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_HOST } from '../../constants/common.constants.ts';
import { IHotelDetails, IHotelGallery, IHotelReview } from '../../types/models/hotel.model.ts';
import { IRoom } from '../../types/models/room.model.ts';
import dayjs from 'dayjs';

const INDEX = `${BACKEND_HOST}/api/hotels`;

export const getDetails = async (hotelId: number): Promise<IHotelDetails> => {
  try {
    const response: AxiosResponse<IHotelDetails> = await axios.get(`${INDEX}/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching hotel details', (error as AxiosError).message);
    throw new Error('An error occurred while fetching hotel details');
  }
};

//this api is not working
export const getGallery = async (hotelId: number): Promise<IHotelGallery[]> => {
  try {
    const response: AxiosResponse<IHotelGallery[]> = await axios.get(`${INDEX}/${hotelId}/gallery`);
    return response.data;
  } catch (e) {
    console.error('An error occurred while fetching gallery', e);
    throw new Error('An error occurred while fetching gallery');
  }
};

export const getReviews = async (hotelId: number): Promise<IHotelReview[]> => {
  try {
    const response: AxiosResponse<IHotelReview[]> = await axios.get(`${INDEX}/${hotelId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching reviews', (error as AxiosError).message);
    throw new Error('An error occurred while fetching reviews');
  }
};

export const getAvailableRooms = async (hotelId: number): Promise<IRoom[]> => {
  try {
    const response: AxiosResponse<IRoom[]> = await axios.get(
      `${INDEX}/${hotelId}/available-rooms`,
      {
        params: {
          checkInDate: dayjs(new Date()).format('YYYY-MM-DD'),
          CheckOutDate: dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD'),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'An error occurred while fetching available rooms',
      (error as AxiosError).message,
    );
    throw new Error('An error occurred while fetching available rooms');
  }
};
