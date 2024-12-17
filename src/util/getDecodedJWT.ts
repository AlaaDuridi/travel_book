import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface DecodedJWTUser {
  id: string;
  userName: string;
  userType: string;
}

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
const getDecodedJWT = (): DecodedJWTUser | null => {
  const token = Cookies.get('jwt');
  if (!token) return null;

  try {
    return jwtDecode<DecodedJWTUser>(token);
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
};

export default getDecodedJWT;
