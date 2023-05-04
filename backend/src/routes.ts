import { Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

export const ROUTES: Routes = [
  {
    path: '/api/v1/auth',
    module: AuthModule,
  },
  {
    path: '/api/v1/health',
    module: HealthModule,
  },
  {
    path: '/api/v1/users',
    module: UsersModule,
  },
];
