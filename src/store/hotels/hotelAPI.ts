import axios, { AxiosResponse, CancelToken } from 'axios';
import { BACKEND_HOST } from '../../constants/common.constants.ts';
import { IHotel } from '../../types/models/hotel.model.ts';
import { PaginationResponse } from '../../types/common.types.ts';
import { IRoom } from '../../types/models/room.model.ts';

const INDEX = `${BACKEND_HOST}/api/hotels`;

export const fetchHotels = async (
  searchQuery: string,
  pageSize: number,
  pageNumber: number,
  cancelToken?: CancelToken,
): Promise<{ data: IHotel[]; total: number; totalPages: number }> => {
  const response = await axios.get(INDEX, {
    params: {
      searchQuery,
      pageSize,
      pageNumber,
    },
    cancelToken,
  });
  const hotels: IHotel[] = response.data;
  const pagination: PaginationResponse = JSON.parse(response.headers['x-pagination']);
  return {
    data: hotels,
    total: pagination.TotalItemCount,
    totalPages: pagination.TotalPageCount,
  };
};

export const updateHotel = async (hotel: IHotel): Promise<IHotel> => {
  const response: AxiosResponse = await axios.put(`${INDEX}/${hotel.id}`, hotel);
  return response.data;
};

export const fetchHotelRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string,
): Promise<IRoom[]> => {
  const response: AxiosResponse<Omit<IRoom, 'hotelId'>[]> = await axios.get(
    `${INDEX}/${hotelId}/rooms`,
    {
      params: {
        checkInDate,
        checkOutDate,
      },
    },
  );
  return response.data.map((room: Omit<IRoom, 'hotelId'>) => {
    return {
      ...room,
      hotelId,
    } as IRoom;
  });
};

interface ICreateHotelRoomPayload {
  hotelId: number;
  roomNumber: number;
  cost: number;
}

export const createHotelRoom = async (payload: ICreateHotelRoomPayload): Promise<IRoom> => {
  const response: AxiosResponse<IRoom> = await axios.post(`${INDEX}/${payload.hotelId}/rooms`, {
    roomNumber: payload.roomNumber,
    cost: payload.cost,
  });
  return {
    id: response.data.id,
    roomNumber: response.data.roomNumber,
    price: response.data.price,
    hotelId: payload.hotelId,
  } as IRoom;
};

export const deleteHotelRoom = async (hotelId: number, roomId: number): Promise<AxiosResponse> => {
  return await axios.delete(`${INDEX}/${hotelId}/rooms/${roomId}`);
};
