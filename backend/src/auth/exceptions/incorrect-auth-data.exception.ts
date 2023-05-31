import { UnauthorizedException } from '@nestjs/common';

export class IncorrectAuthDataException extends UnauthorizedException {
  constructor() {
    super('Incorrect login or password');
  }
}
