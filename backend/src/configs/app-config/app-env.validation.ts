import { IsEnum, IsNumber } from 'class-validator';

enum Environment {
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
