import { UnauthorizedException } from '@nestjs/common';

export class IncorectAuthDataExeption extends UnauthorizedException {
  constructor() {
    super('Incorect login or password');
  }
}
