import { NotFoundException } from '@nestjs/common';

export class RoleByIdNotFoundExeption extends NotFoundException {
  constructor() {
    super(`Role with id not found`);
  }
}
