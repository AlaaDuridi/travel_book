import axios from 'axios';
import { ILoginCredentials, ILoginResponse } from '../../types/models/auth.model';
import { BACKEND_HOST } from '../../constants/common.constants';

const API_URL = `${BACKEND_HOST}/api/auth/authenticate`;

export const loginUserAPI = async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
  const response = await axios.post<ILoginResponse>(API_URL, credentials);
  return response.data;
};
