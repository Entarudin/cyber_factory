import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfigNamespace from '@configs/database-config/database-config.namespace';

@Module({
  imports: [ConfigModule.forFeature(databaseConfigNamespace)],
  providers: [],
  exports: [],
})
export class DatabaseConfigModule {}
