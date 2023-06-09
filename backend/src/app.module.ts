import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { GlobalExceptionsFilter } from '@common/fillters/global-exeptions.fillter';
import { UsersModule } from '@/users/users.module';
import { TokensModule } from '@/tokens/tokens.module';
import { RolesModule } from '@/roles/roles.module';
import { ROUTES } from '@/routes';
import { HealthModule } from '@/health/health.module';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesModule } from '@/devices/devices.module';
import { StructuralFunctionalCharacteristicsModule } from '@/structural-functional-characteristics/structural-functional-characteristics.module';

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
