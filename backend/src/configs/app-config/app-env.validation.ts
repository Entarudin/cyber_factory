import { IsEnum, IsNumber } from 'class-validator';

export enum Environment {
  dev = 'dev',
  test = 'test',
  prod = 'prod',
}

export class AppEnvironmentVariables {
  @IsEnum(Environment)
  APP_ENV: Environment;

  @IsNumber()
  BACKEND_ENV_PORT: number;
}
