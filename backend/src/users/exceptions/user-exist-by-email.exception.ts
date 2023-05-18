import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistByEmailException extends BadRequestException {
  constructor() {
    super('User with this email already exists');
  }
}
