import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { IDatabaseConfig } from '../configs/database-config';
import { DatabaseConfigModule } from '../configs/database-config/database-config.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<IDatabaseConfig>('database');
        console.log(__dirname);
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.database,
          entities: [
            join(
              process.cwd(),
              'dist',
              '**',
              'entity',
              '**',
              '*.entity.{ts,js}',
            ),
          ],
          autoLoadEntities: true,
          logging: true,
          synchronize: false,
          migrationsRun: true,
          migrations: [
            join(
              process.cwd(),
              'dist',
              'database',
              'migrations',
              '**',
              '*migration.ts',
            ),
          ],
          cli: {
            migrationsDir: 'database/migrations',
          },
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
