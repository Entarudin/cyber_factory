import { UnauthorizedException } from '@nestjs/common';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor() {
    super('The access token has expired or the token is not correct');
  }
}
