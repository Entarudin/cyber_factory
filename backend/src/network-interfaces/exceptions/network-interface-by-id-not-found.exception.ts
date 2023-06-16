import { NotFoundException } from '@nestjs/common';

export class NetworkInterfaceByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Network interface with id not found`);
  }
}
