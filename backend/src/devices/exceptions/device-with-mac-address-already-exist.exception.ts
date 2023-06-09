import { BadRequestException } from '@nestjs/common';

export class DeviceWithMacAddressExistException extends BadRequestException {
  constructor() {
    super(
      'Device with this mac address already exists in cyber physical system',
    );
  }
}
