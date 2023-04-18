import { AuthModule } from './auth/auth.module';

export const ROUTES = [
  {
    path: '/api/v1/auth',
    module: AuthModule,
  },
];
