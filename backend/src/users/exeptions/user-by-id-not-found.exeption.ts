import { NotFoundException } from '@nestjs/common';

export class UserByIdNotFoundExeption extends NotFoundException {
  constructor() {
    super(`User with id not found`);
  }
}
