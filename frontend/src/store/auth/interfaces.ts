import { Status } from 'store/abstracts';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
}

export interface IAuthState {
  status: Status;
  errorMessage: string | unknown;
}
