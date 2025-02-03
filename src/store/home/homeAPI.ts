import axios, { AxiosResponse, CancelToken } from 'axios';
import { BACKEND_HOST } from '../../constants/common.constants';
import {
  IFeaturedDeal,
  IHomeResult,
  IHomeSearchRequestParams,
  ITrendingDestination,
} from '../../types/models/home.model.ts';
import getDecodedJWT from '../../util/getDecodedJWT.ts';

const INDEX = `${BACKEND_HOST}/api/home`;

export const searchHomeAPI = async ({
  city,
  checkInDate,
  checkOutDate,
  numberOfRooms,
  adults,
  children,
  cancelToken,
}: IHomeSearchRequestParams & {
  cancelToken?: CancelToken;
}): Promise<IHomeResult[]> => {
  const config = {
    params: {
      city,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      adults,
      children,
    },
    cancelToken,
  };
  const response: AxiosResponse<IHomeResult[]> = await axios.get(`${INDEX}/search`, config);
  console.log('response of search home api', response.data);
  return response.data;
};

export const featuredDealsAPI = async (): Promise<IFeaturedDeal[]> => {
  const response: AxiosResponse<IFeaturedDeal[]> = await axios.get(`${INDEX}/featured-deals`);
  console.log('response of featured deals api', response.data);
  return response.data;
};

export const trendingDestinationAPI = async (): Promise<ITrendingDestination[]> => {
  const response: AxiosResponse<ITrendingDestination[]> = await axios.get(
    `${INDEX}/destinations/trending`,
  );
  console.log('response of trending destination api', response.data);
  return response.data;
};

export const getRecentHotelsAPI = async (): Promise<IHomeResult[]> => {
  const userId: number = Number(getDecodedJWT()?.user_id);
  const response: AxiosResponse<IHomeResult[]> = await axios.get(
    `${INDEX}/users/${userId}/recent-hotels`,
  );
  console.log('response of recent hotels api', response.data);
  return response.data;
};
