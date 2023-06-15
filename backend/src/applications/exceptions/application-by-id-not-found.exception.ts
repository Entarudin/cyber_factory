import { NotFoundException } from '@nestjs/common';

export class ApplicationByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Application service with id not found`);
  }
}
