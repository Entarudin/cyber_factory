import { NotFoundException } from '@nestjs/common';

export class DeviceByMacAddressNotFoundException extends NotFoundException {
  constructor() {
    super(`Device with mac address not found`);
  }
}
