import { NotFoundException } from '@nestjs/common';

export class SystemServiceByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`System service with id not found`);
  }
}
