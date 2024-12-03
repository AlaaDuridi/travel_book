import { USER_TYPE } from '../../constants/common.constants.ts';

export interface ILoginCredentials {
  userName: string;
  password: string;
}

export interface ILoginResponse {
  userType: USER_TYPE;
  authentication: string;
}
