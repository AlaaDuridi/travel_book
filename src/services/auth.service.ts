import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_HOST, USER_TYPE } from '../constants/common.constants.ts';
import { ILoginCredentials, ILoginResponse } from '../types/models/auth.model.ts';

const INDEX = `${BACKEND_HOST}/api/auth/authenticate`;

class AuthService {
  static async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    try {
      // const response: AxiosResponse<ILoginResponse> = await axios.post(INDEX, credentials);
      return {
        // userType: response.data.userType,
        userType: USER_TYPE.ADMIN,
        // authentication: response.data.authentication,
        authentication: 'HVz7OK7M7wz6VQSKcOuo4aYk4bkWs9AknwAPaAo58e2c91b0',
      };
    } catch (error) {
      AuthService.handleError(error as AxiosError);
      throw new Error('Login failed');
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

export default AuthService;
