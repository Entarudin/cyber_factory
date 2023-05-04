import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { GlobalExceptionsFilter } from '@common/fillters/global-exeptions.fillter';
import { UsersModule } from '@/users/users.module';
import { TokensModule } from '@/tokens/tokens.module';
import { RolesModule } from '@/roles/roles.module';
import { JwtConfigModule } from '@/configs/jwt-config';
import { ROUTES } from '@/routes';
import { HealthModule } from '@/health/health.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtConfigModule,
    UsersModule,
    TokensModule,
    RolesModule,
    AuthModule,
    HealthModule,
    JwtModule.register({}),
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
