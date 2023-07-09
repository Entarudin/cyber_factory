import jwtConfigNamespace from '@configs/jwt-config/jwt-config.namespace';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(jwtConfigNamespace)],
  providers: [],
  exports: [],
})
export class JwtConfigModule {}
