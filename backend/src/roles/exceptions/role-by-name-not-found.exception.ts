import { NotFoundException } from '@nestjs/common';

export class RoleByNameNotFoundException extends NotFoundException {
  constructor() {
    super(`Role with name not found`);
  }
}
