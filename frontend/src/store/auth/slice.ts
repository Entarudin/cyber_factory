import { createSlice } from '@reduxjs/toolkit';
import { axiosAuthLogin, axiosAuthRefresh } from './actions';
import { IAuthState } from './interfaces';

const initialState: IAuthState = {
  status: 'init',
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    deleteStatusAndError: (state) => {
      state.status = 'init';
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosAuthLogin.pending, (state) => {
        state.errorMessage = null;
        state.status = 'loading';
      })
      .addCase(axiosAuthLogin.fulfilled, (state, action) => {
        localStorage.setItem('access', action.payload.accessToken);
        localStorage.setItem('isAuth', 'true');
        state.status = 'resolved';
      })
      .addCase(axiosAuthLogin.rejected, (state, action) => {
        localStorage.removeItem('access');
        localStorage.setItem('isAuth', 'false');
        state.errorMessage = action.payload?.errorMessage;
        state.status = 'rejected';
      });

    builder
      .addCase(axiosAuthRefresh.pending, (state) => {
        state.errorMessage = null;
        state.status = 'loading';
      })
      .addCase(axiosAuthRefresh.fulfilled, (state, action) => {
        localStorage.setItem('access', action.payload.accessToken);
        localStorage.setItem('isAuth', 'true');
        state.status = 'resolved';
      })
      .addCase(axiosAuthRefresh.rejected, (state, action) => {
        localStorage.removeItem('access');
        localStorage.setItem('isAuth', 'false');
        state.errorMessage = action.payload?.errorMessage;
        state.status = 'rejected';
      });
  },
});

export { authSlice };