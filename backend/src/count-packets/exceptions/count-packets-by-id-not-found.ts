import { NotFoundException } from '@nestjs/common';

export class CountPacketsByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Count Packets with id not found`);
  }
}
