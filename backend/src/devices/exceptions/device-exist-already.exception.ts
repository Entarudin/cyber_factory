import { BadRequestException } from '@nestjs/common';

export class DeviceExistException extends BadRequestException {
  constructor() {
    super(
      'Device with this name or ip address already exists in cyber physical system',
    );
  }
}
