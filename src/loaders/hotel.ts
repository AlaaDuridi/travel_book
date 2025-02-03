import { LoaderFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { getDetails, getReviews, getAvailableRooms } from '../store/hotel/hotelAPI.ts';
import { toast } from 'react-toastify';
import { IHotelData } from '../types/models/hotel.model.ts';

export const hotelLoader = (queryClient: QueryClient): LoaderFunction => {
  return async ({ params }) => {
    const hotelId = Number(params.hotelId);
    console.log('hotelId', hotelId);
    if (!hotelId) throw new Error('Hotel ID is required');

    const queryKey = ['hotel', hotelId];
    const queryFn = async (): Promise<IHotelData | undefined> => {
      try {
        const [details, reviews, rooms] = await Promise.all([
          getDetails(hotelId),
          getReviews(hotelId),
          getAvailableRooms(hotelId),
        ]);
        return { details, reviews, rooms };
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        toast.error('an error occurred');
      }
    };

    // Check if data is already in the cache
    const cachedData = queryClient.getQueryData<IHotelData>(queryKey);
    if (cachedData) return cachedData;

    // Fetch and cache data if not already in the cache
    return await queryClient.fetchQuery<IHotelData | undefined>({
      queryKey,
      queryFn,
    });
  };
};
