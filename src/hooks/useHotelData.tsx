import { useQuery } from '@tanstack/react-query';
import { getDetails, getGallery, getReviews, getAvailableRooms } from '../store/hotel/hotelAPI.ts';
import { toast } from 'react-toastify';
import { GALLERY_ITEMS } from '../constants/gallery.ts';
import { IHotelGallery } from '../types/models/hotel.model.ts';

export const useHotelDetails = (hotelId: number) => {
  return useQuery({
    queryKey: ['hotel-details', hotelId],
    queryFn: async () => {
      try {
        return await getDetails(hotelId);
      } catch {
        toast.error('An error occurred while fetching hotel details');
      }
    },
  });
};
export const useHotelReviews = (hotelId: number) => {
  return useQuery({
    queryKey: ['hotel-reviews', hotelId],
    queryFn: async () => {
      try {
        return await getReviews(hotelId);
      } catch {
        toast.error('An error occurred while fetching hotel reviews');
      }
    },
  });
};

export const useHotelGallery = (hotelId: number) => {
  return useQuery({
    queryKey: ['hotel-gallery', hotelId],
    queryFn: async (): Promise<IHotelGallery[]> => {
      try {
        return await getGallery(hotelId);
      } catch {
        //return static items
        return GALLERY_ITEMS;
      }
    },
  });
};

export const useHotelRooms = (hotelId: number) => {
  return useQuery({
    queryKey: ['hotel-available-rooms', hotelId],
    queryFn: async () => {
      try {
        return await getAvailableRooms(hotelId);
      } catch {
        toast.error('An error occurred while fetching hotel available rooms');
      }
    },
  });
};
export const useHotelData = (hotelId: number) => {
  return useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: async () => {
      try {
        const [details, reviews, rooms] = await Promise.all([
          getDetails(hotelId),
          getReviews(hotelId),
          getAvailableRooms(hotelId),
        ]);
        return { details, reviews, rooms };
      } catch {
        toast.error('An error occurred while fetching hotel data');
      }
    },
  });
};
