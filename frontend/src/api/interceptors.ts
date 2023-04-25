import { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

import { store } from 'store'
import { axiosAuthRefresh } from 'store/auth/actions'

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = Cookies.get('access')

  if (token && !config.url?.includes('auth')) {
    const decodedToken: { exp: number } = jwt_decode(token)
    const currentDate = new Date()

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const refresh = Cookies.get('refresh')
      if (refresh) await store.dispatch(axiosAuthRefresh({ refreshToken: refresh }))

      if (config?.headers) {
        const newToken = Cookies.get('access')
        if (newToken) {
          ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${newToken}`)
        }
      }
    } else {
      ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
    }
  }
  return config
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error)
}

export { onRequest, onRequestError, onResponse, onResponseError }
