import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistByEmailExeption extends BadRequestException {
  constructor() {
    super('User with this email already exists');
  }
}
