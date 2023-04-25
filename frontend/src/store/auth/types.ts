export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}

export interface IRefreshRequest {
  refreshToken: string
}

export interface IRefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  status: string | null
  error: string | null
}
