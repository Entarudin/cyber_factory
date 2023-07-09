import { ConfigNamespacesEnum } from '@common/constants/config-namespaces.enum';
import { AppConfigModule, IAppConfig } from '@configs/app-config';
import {
  DatabaseConfigModule,
  IDatabaseConfig,
} from '@configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule, AppConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get<IDatabaseConfig>(
          ConfigNamespacesEnum.DATABASE,
        );
        const appConfig = configService.get<IAppConfig>(
          ConfigNamespacesEnum.APP,
        );
        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          autoLoadEntities: true,
          logging: !appConfig.isProd,
          dropSchema: false,
          synchronize: false,
          migrationsRun: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
