import { Routes } from '@nestjs/core';
import { AuthModule } from '@/auth/auth.module';
import { HealthModule } from '@/health/health.module';
import { UsersModule } from '@/users/users.module';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesModule } from '@/devices/devices.module';

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
  {
    path: '/api/v1/cfs',
    module: CyberPhysicalSystemsModule,
  },
  {
    path: '/apit/v1/devices',
    module: DevicesModule,
  },
];
