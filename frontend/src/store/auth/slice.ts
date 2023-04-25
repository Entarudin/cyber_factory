import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { axiosAuthLogin, axiosAuthRefresh } from './actions'
import { AuthState } from './types'

const initialState: AuthState = {
  status: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    deleteStatusAndError: (state) => {
      state.status = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosAuthLogin.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(axiosAuthLogin.fulfilled, (state, action) => {
        Cookies.set('refresh', action.payload.refreshToken)
        Cookies.set('access', action.payload.accessToken)
        Cookies.set('isAuth', 'true')
        state.status = 'resolved'
      })
      .addCase(axiosAuthLogin.rejected, (state, action) => {
        Cookies.set('access', '')
        Cookies.set('isAuth', 'true')
        if (action.payload?.errorMessage != null) {
          state.error = action.payload?.errorMessage
        }
        state.status = 'rejected'
      })

    builder
      .addCase(axiosAuthRefresh.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(axiosAuthRefresh.fulfilled, (state, action) => {
        Cookies.set('refresh', action.payload.refreshToken)
        Cookies.set('access', action.payload.refreshToken)
        Cookies.set('isAuth', 'true')
        state.status = 'resolved'
      })
      .addCase(axiosAuthRefresh.rejected, (state, action) => {
        Cookies.set('access', '')
        Cookies.set('isAuth', 'false')
        if (action.payload?.errorMessage) {
          state.error = action.payload?.errorMessage
        }
        state.status = 'rejected'
      })
  },
})

export { authSlice }
