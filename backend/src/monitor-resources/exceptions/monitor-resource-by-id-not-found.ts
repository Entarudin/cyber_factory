import { NotFoundException } from '@nestjs/common';

export class MonitorResourceByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Monitor resource with id not found`);
  }
}
