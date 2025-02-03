import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

/**
 * decoded token EXAMPLE
 * {user_id: '1', given_name: 'Mohamad', family_name: 'Milhem', userType: 'Admin', nbf: 1734726227, …}
 * exp
 * 1734729827
 * family_name
 * "Milhem"
 * given_name
 * "Mohamad"
 * iss
 * "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net"
 * nbf
 * 1734726227
 * userType
 * "Admin"
 * user_id
 * "1"
 */
export interface DecodedJWTUser {
  user_id: string;
  userType: string;
  exp: number;
  family_name: string;
  given_name: string;
  iss: string;
  nbf: number;
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
    const user: DecodedJWTUser = jwtDecode(token);
    console.log('decoded user is', user);
    return user;
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
};

export default getDecodedJWT;
