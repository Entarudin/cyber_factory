import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import jwtConfigNamespace from '@configs/jwt-config/jwt-config.namespace';

@Module({
  imports: [ConfigModule.forFeature(jwtConfigNamespace)],
  providers: [],
  exports: [],
})
export class JwtConfigModule {}
