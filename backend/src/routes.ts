import { Routes } from '@nestjs/core';
import { AuthModule } from '@/auth/auth.module';
import { HealthModule } from '@/health/health.module';
import { UsersModule } from '@/users/users.module';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesModule } from '@/devices/devices.module';
import { StructuralFunctionalCharacteristicsModule } from '@/structural-functional-characteristics/structural-functional-characteristics.module';
import { SystemServicesModule } from '@/system-services/system-services.module';
import { ApplicationsModule } from '@/applications/applications.module';

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
    path: '/api/v1/devices',
    module: DevicesModule,
  },
  {
    path: '/api/v1/sfc',
    module: StructuralFunctionalCharacteristicsModule,
  },
  {
    path: '/api/v1/system-services',
    module: SystemServicesModule,
  },
  {
    path: '/api/v1/applications',
    module: ApplicationsModule,
  },
];
