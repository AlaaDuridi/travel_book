import axios, {AxiosResponse, CancelToken} from 'axios';
import {ICity} from '../../types/models/city.model.ts';
import {BACKEND_HOST} from '../../constants/common.constants.ts';
import {IHotel} from '../../types/models/hotel.model.ts';

const INDEX = `${BACKEND_HOST}/api/cities`;

export const fetchCitiesAPI = async (
    searchQuery: string,
    pageSize: number,
    pageNumber: number,
    cancelToken?: CancelToken,
): Promise<ICity[]> => {
    const config = {
        params: {searchQuery, pageSize, pageNumber},
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

export const createHotelAPI = async (
    hotel: Omit<IHotel, 'id'>,
    cityId: number,
): Promise<IHotel> => {
    const payload: Omit<IHotel, 'id'> = {
        name: hotel.name,
        description: hotel.description,
        hotelType: hotel.hotelType,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        starRating: hotel.starRating,
    };
    const response = await axios.post(`${INDEX}/${cityId}/hotels`, payload);
    return response.data;
};

export const deleteHotelAPI = async (hotelId: number, cityId: number): Promise<AxiosResponse> => {
    const response = await axios.delete(`${INDEX}/${cityId}/hotels/${hotelId}`);
    return response.data;
};
export const fetchHotelsByCityAPI = async (
    cityId: number,
    searchQuery: string,
    pageSize: number,
    pageNumber: number,
    cancelToken: CancelToken,
): Promise<{ data: IHotel[] }> => {
    const response = await axios.get(`${INDEX}/${cityId}/hotels`, {
        params: {
            searchQuery,
            pageSize,
            pageNumber,
        },
        cancelToken,
    });

    const hotels: IHotel[] = response.data;
    return {
        data: hotels,
    };
};
