import { NotFoundException } from '@nestjs/common';

export class DeviceByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Device with id not found`);
  }
}
