export interface IUser {
  email: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
}

export interface UsersState {
  status: string | null;
  errorMessage: string | null;
}
