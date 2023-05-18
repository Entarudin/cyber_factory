import { NotFoundException } from '@nestjs/common';

export class RoleByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Role with id not found`);
  }
}
