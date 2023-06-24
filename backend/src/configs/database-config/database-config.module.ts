import databaseConfigNamespace from '@configs/database-config/database-config.namespace';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfigNamespace)],
  providers: [],
  exports: [],
})
export class DatabaseConfigModule {}
