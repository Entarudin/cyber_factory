import { UnauthorizedException } from '@nestjs/common';

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super('The refresh token has expired or the token is not in the database');
  }
}
