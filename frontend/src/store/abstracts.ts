import { store } from './store';

export interface IApiError {
  errorMessage: string;
}

export type Status = 'init' | 'loading' | 'resolved' | 'rejected';
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
