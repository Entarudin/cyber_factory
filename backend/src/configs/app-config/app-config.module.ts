import appConfigNamespace from '@configs/app-config/app-config.namespace';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(appConfigNamespace)],
  providers: [],
  exports: [],
})
export class AppConfigModule {}
