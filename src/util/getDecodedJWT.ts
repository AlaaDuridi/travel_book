import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface DecodedJWTUser {
  id: string;
  userName: string;
  userType: string;
}

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
