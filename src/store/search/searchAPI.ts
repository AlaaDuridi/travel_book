import { IHomeSearchRequestParams, IHomeResult } from '../../types/models/home.model.ts';
import { ROOM_TYPES } from '../../types/models/room.model.ts';
import { BACKEND_HOST } from '../../constants/common.constants.ts';

const mockResults: IHomeResult[] = [
  {
    hotelId: 1,
    hotelName: 'Luxury Hotel',
    starRating: 5,
    latitude: 40.7128,
    longitude: -74.006,
    roomPrice: 250,
    roomType: ROOM_TYPES.DELUXE,
    cityName: 'New York',
    roomPhotoUrl:
      'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    discount: 10,
    amenities: [
      { name: 'Free Wi-Fi', description: 'Free Wi-FI' },
      { name: 'Air Conditioning', description: 'Air Conditioning' },
    ],
  },
  {
    hotelId: 2,
    hotelName: 'Budget Inn',
    starRating: 3,
    latitude: 34.0522,
    longitude: -118.2437,
    roomPrice: 100,
    roomType: ROOM_TYPES.STANDARD,
    cityName: 'Los Angeles',
    roomPhotoUrl:
      'https://media.istockphoto.com/id/2108539552/photo/half-opened-door-of-hotel-room-with-blurred-luxury-bedroom-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=LQqbvqJDqgNO9xWyOmkSoE4jMgmdVEbVz6_zo2cIjqs=',
    discount: 5,
    amenities: [
      { name: 'Free Wi-Fi', description: 'Free Wi-FI' },
      { name: 'Air Conditioning', description: 'Air Conditioning' },
    ],
  },
];
const INDEX = `${BACKEND_HOST}/api/home/search`;

export const searchHotelsAPI = async (params: IHomeSearchRequestParams): Promise<IHomeResult[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResults);
    }, 1000); // 1-second delay
  });
};
