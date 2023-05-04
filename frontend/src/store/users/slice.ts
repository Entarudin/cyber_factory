import { createSlice } from '@reduxjs/toolkit';
import { axiosGetUsers } from './actions';
import { UsersState } from './types';

const initialState: UsersState = {
  status: null,
  errorMessage: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteStatusAndError: (state) => {
      state.status = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosGetUsers.pending, (state) => {
        state.errorMessage = null;
        state.status = 'loading';
      })
      .addCase(axiosGetUsers.fulfilled, (state, action) => {
        state.status = 'resolved';
      })
      .addCase(axiosGetUsers.rejected, (state, action) => {
        state.status = 'rejected';
      });
  },
});
