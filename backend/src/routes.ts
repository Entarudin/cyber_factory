import { Routes } from '@nestjs/core';

import { ApplicationsModule } from '@/applications/applications.module';
import { ArpTableModule } from '@/arp-table/arp-table.module';
import { AuthModule } from '@/auth/auth.module';
import { CountPacketsModule } from '@/count-packets/count-packets.module';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesModule } from '@/devices/devices.module';
import { HealthModule } from '@/health/health.module';
import { HostsModule } from '@/hosts/hosts.module';
import { MonitorResourcesModule } from '@/monitor-resources/monitor-resources.module';
import { NetworkInterfacesModule } from '@/network-interfaces/network-interfaces.module';
import { StructuralFunctionalCharacteristicsModule } from '@/structural-functional-characteristics/structural-functional-characteristics.module';
import { SystemServicesModule } from '@/system-services/system-services.module';
import { UsersModule } from '@/users/users.module';

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
  {
    path: '/api/v1/network-interfaces',
    module: NetworkInterfacesModule,
  },
  {
    path: '/api/v1/monitor-resources',
    module: MonitorResourcesModule,
  },
  {
    path: '/api/v1/arp-table',
    module: ArpTableModule,
  },
  {
    path: '/api/v1/count-packets',
    module: CountPacketsModule,
  },
  {
    path: '/api/v1/hosts',
    module: HostsModule,
  },
];
