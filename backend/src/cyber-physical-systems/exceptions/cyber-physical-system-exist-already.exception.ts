import { BadRequestException } from '@nestjs/common';

export class CyberPhysicalSystemAlreadyExistByNameException extends BadRequestException {
  constructor() {
    super('Cyber Physical System with this name already exists');
  }
}
