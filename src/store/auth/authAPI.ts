import axios from 'axios';
import { ILoginCredentials } from '../../types/models/auth.model';
import { BACKEND_HOST } from '../../constants/common.constants';

const API_URL = `${BACKEND_HOST}/api/auth/authenticate`;

export const loginUser = async (credentials: ILoginCredentials): Promise<void> => {
  await axios.post(API_URL, credentials, {
    withCredentials: true, // Ensure cookies are sent with the request
  });
};

export const logoutUser = async (): Promise<void> => {
  await axios.post(`${BACKEND_HOST}/api/auth/logout`, null, {
    withCredentials: true, // Ensure cookies are cleared by the server
  });
};
