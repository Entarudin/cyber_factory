import { IsNumber, IsString } from 'class-validator';

export class JwtEnvironmentVariables {
  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsNumber()
  JWT_ACCESS_EXPIRATION_IN_SECONDS: number;

  @IsNumber()
  JWT_REFRESH_EXPIRATION_IN_DAYS: number;
}
