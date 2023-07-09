import { NotFoundException } from '@nestjs/common';

export class ArpTableItemByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Arp table item with id not found`);
  }
}
