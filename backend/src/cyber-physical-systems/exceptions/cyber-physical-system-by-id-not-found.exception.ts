import { NotFoundException } from '@nestjs/common';

export class CyberPhysicalSystemByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Cyber Physical System with id not found`);
  }
}
