import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    __dirname + '/**/*.entity{.ts,.js}',
    __dirname + '/**/dao/*.entity{.ts,.js}',
  ],
  dropSchema: false,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [
    __dirname + '/**/migrations/*{.ts,.js}',
    __dirname + '/**/dao/migrations/*{.ts,.js}',
  ],
  namingStrategy: new SnakeNamingStrategy(),
});
