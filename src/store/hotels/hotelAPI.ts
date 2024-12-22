import axios, { AxiosResponse, CancelToken } from 'axios';
import { BACKEND_HOST } from '../../constants/common.constants.ts';
import { IHotel } from '../../types/models/hotel.model.ts';
import { PaginationResponse } from '../../types/common.types.ts';

const INDEX = `${BACKEND_HOST}/api/hotels`;

export const fetchHotels = async (
  searchQuery: string,
  pageSize: number,
  pageNumber: number,
  cancelToken: CancelToken,
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
  console.log('response of the update hotel is ', response, ' and we return its data');
  return response.data;
};
