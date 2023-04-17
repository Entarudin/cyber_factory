import { NotFoundException } from '@nestjs/common';

export class RoleByNameNotFoundExeption extends NotFoundException {
  constructor() {
    super(`Role with name not found`);
  }
}
