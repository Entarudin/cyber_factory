import axios, { AxiosInstance } from 'axios'
import { onRequest, onRequestError, onResponse, onResponseError } from './interceptors'

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use(onRequest, onRequestError)
api.interceptors.response.use(onResponse, onResponseError)

export { api }
