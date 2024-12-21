import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import { BACKEND_HOST } from '../constants/common.constants.ts';
import { ICity } from '../types/models/city.model.ts';
import { toast } from 'react-toastify';

const INDEX = `${BACKEND_HOST}/api/cities`;

class CitiesService {
  static async list(
    searchQuery: string,
    pageSize: string,
    pageNumber: string,
    cancelToken: CancelToken,
  ): Promise<ICity[] | null> {
    try {
      const config = {
        params: {
          searchQuery,
          pageSize,
          pageNumber,
        },
        cancelToken,
      };

      const response: AxiosResponse<ICity[]> = await axios.get(`${INDEX}`, config);
      return response.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        CitiesService.handleError(error as AxiosError);
      }
      return null;
    }
  }

  static async add(city: Pick<ICity, 'name' | 'description'>): Promise<ICity | null> {
    try {
      const payload = {
        name: city.name,
        description: city.description,
      };
      const response = await axios.post(`${INDEX}`, payload);
      return response.data;
    } catch (error) {
      CitiesService.handleError(error as AxiosError);
      return null;
    }
  }

  static async update(city: ICity): Promise<ICity | null> {
    try {
      const payload = {
        name: city.name,
        description: city.description,
      };
      const response = await axios.put(`${INDEX}/${city.id}`, payload);
      if (response.status >= 200 && response.status < 300) {
        return city;
      }
      return null;
    } catch (error) {
      CitiesService.handleError(error as AxiosError);
      return null;
    }
  }

  static async delete(citId: number): Promise<void> {
    try {
      await axios.delete(`${INDEX}/${citId}`);
    } catch (error) {
      CitiesService.handleError(error as AxiosError);
    }
  }

  private static handleError(error: AxiosError): void {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        // @ts-expect-error Expected
        error.response?.data?.message || 'An error occurred.';
      toast.error(errorMessage);
    } else {
      toast.error('An unexpected error occurred.');
    }
  }
}

export default CitiesService;
