import axios, { AxiosResponse, CancelToken } from 'axios';
import { ICity } from '../../types/models/city.model.ts';
import { BACKEND_HOST } from '../../constants/common.constants.ts';

const INDEX = `${BACKEND_HOST}/api/cities`;

export const fetchCitiesAPI = async (
  searchQuery: string,
  pageSize: string,
  pageNumber: string,
  cancelToken: CancelToken,
): Promise<ICity[]> => {
  const config = {
    params: { searchQuery, pageSize, pageNumber },
    cancelToken,
  };
  const response = await axios.get<ICity[]>(INDEX, config);
  return response.data;
};

export const addCityAPI = async (city: Pick<ICity, 'name' | 'description'>): Promise<ICity> => {
  const payload = {
    name: city.name,
    description: city.description,
  };
  const response = await axios.post<ICity>(INDEX, payload);
  return response.data;
};

export const updateCityAPI = async (city: ICity): Promise<ICity> => {
  const payload = {
    name: city.name,
    description: city.description,
  };
  const response = await axios.put<ICity>(`${INDEX}/${city.id}`, payload);
  if (response.status >= 200 && response.status < 300) {
    return city;
  }
  throw new Error('Failed to update city');
};

export const deleteCityAPI = async (cityId: number): Promise<AxiosResponse> => {
  return await axios.delete(`${INDEX}/${cityId}`);
};
