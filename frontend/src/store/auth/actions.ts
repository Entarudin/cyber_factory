import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'api/axios'
import { ILoginRequest, ILoginResponse, IRefreshRequest, IRefreshResponse } from './types'
import { IApiError } from 'store/types'

const axiosAuthLogin = createAsyncThunk<ILoginResponse, ILoginRequest, { rejectValue: IApiError }>(
  'auth/login',
  async (dto, thunkApi) => {
    const response = await api.post('/auth/login', { ...dto })

    if (response.status >= 400) {
      return thunkApi.rejectWithValue(response.data as IApiError)
    }

    return response.data as ILoginResponse
  },
)

const axiosAuthRefresh = createAsyncThunk<
  IRefreshResponse,
  IRefreshRequest,
  { rejectValue: IApiError }
>('auth/refresh', async (dto, thunkApi) => {
  const response = await api.post('/auth/refresh', { ...dto })

  if (response.status >= 400) {
    return thunkApi.rejectWithValue(response.data as IApiError)
  }

  return response.data as IRefreshResponse
})

const authActions = {
  axiosAuthLogin,
  axiosAuthRefresh,
}

export { axiosAuthLogin, axiosAuthRefresh, authActions }
