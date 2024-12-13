import { ILoginCredentials, ILoginResponse } from '../../types/models/auth.model';
import AuthService from '../../services/auth.service.ts';

export const loginUserAPI = async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
  return await AuthService.login(credentials);
};
