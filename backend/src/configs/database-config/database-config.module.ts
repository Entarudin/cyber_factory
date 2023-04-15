import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfigNamespace from './database-config.namespace';

@Module({
  imports: [ConfigModule.forFeature(databaseConfigNamespace)],
  providers: [],
  exports: [],
})
export class DatabaseConfigModule {}
