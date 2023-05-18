import { NotFoundException } from '@nestjs/common';

export class UserByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`User with id not found`);
  }
}
