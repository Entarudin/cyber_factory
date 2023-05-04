import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/axios';
import { IApiError } from 'store/abstracts';

export const axiosGetUsers = createAsyncThunk<{ rejectValue: IApiError }>(
  'users/getAll',
  async (_, thunkApi) => {
    const response = await api.get('/users');

    if (response.status >= 400) {
      return thunkApi.rejectWithValue(response.data as IApiError);
    }

    return response.data;
  },
);
