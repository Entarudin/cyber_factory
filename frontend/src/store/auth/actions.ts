import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from 'api/axios';
import { ILoginRequest, ILoginResponse, IRefreshResponse } from './interfaces';
import { IApiError } from 'store/abstracts';

const axiosAuthLogin = createAsyncThunk<ILoginResponse, ILoginRequest, { rejectValue: IApiError }>(
  'auth/login',
  async (dto, thunkApi) => {
    const response = await api.post('/auth/login', { ...dto });

    if (response.status >= 400) {
      return thunkApi.rejectWithValue(response.data as IApiError);
    }

    return response.data as ILoginResponse;
  },
);

const axiosAuthRefresh = createAsyncThunk<IRefreshResponse, undefined, { rejectValue: IApiError }>(
  'auth/refresh',
  async (_, thunkApi) => {
    const response = await api.get('/auth/refresh');

    if (response.status >= 400) {
      return thunkApi.rejectWithValue(response.data as IApiError);
    }

    return response.data as IRefreshResponse;
  },
);


export { axiosAuthLogin, axiosAuthRefresh };