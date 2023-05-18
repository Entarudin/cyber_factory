import { UnauthorizedException } from '@nestjs/common';

export class IncorectAuthDataException extends UnauthorizedException {
  constructor() {
    super('Incorect login or password');
  }
}
