import { NotFoundException } from '@nestjs/common';

export class HostByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Host with id not found`);
  }
}
