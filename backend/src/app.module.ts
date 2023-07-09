import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import { ApplicationsModule } from '@/applications/applications.module';
import { ArpTableModule } from '@/arp-table/arp-table.module';
import { AuthModule } from '@/auth/auth.module';
import { GlobalExceptionsFilter } from '@/common/filters/global-exceptions.filter';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DatabaseModule } from '@/database/database.module';
import { DevicesModule } from '@/devices/devices.module';
import { HealthModule } from '@/health/health.module';
import { MonitorResourcesModule } from '@/monitor-resources/monitor-resources.module';
import { NetworkInterfacesModule } from '@/network-interfaces/network-interfaces.module';
import { RolesModule } from '@/roles/roles.module';
import { ROUTES } from '@/routes';
import { StructuralFunctionalCharacteristicsModule } from '@/structural-functional-characteristics/structural-functional-characteristics.module';
import { SystemServicesModule } from '@/system-services/system-services.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TokensModule,
    RolesModule,
    AuthModule,
    CyberPhysicalSystemsModule,
    DevicesModule,
    StructuralFunctionalCharacteristicsModule,
    SystemServicesModule,
    ApplicationsModule,
    NetworkInterfacesModule,
    MonitorResourcesModule,
    ArpTableModule,
    HealthModule,
    RouterModule.register(ROUTES),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
