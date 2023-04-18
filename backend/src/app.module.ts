import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AutnModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionsFilter } from './common/fillters/global-exeptions.fillter';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { RolesModule } from './roles/roles.module';
import { JwtConfigModule } from './configs/jwt-config';

@Module({
  imports: [
    DatabaseModule,
    JwtConfigModule,
    UsersModule,
    TokensModule,
    RolesModule,
    AutnModule,
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
