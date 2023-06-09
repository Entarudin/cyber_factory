import { NotFoundException } from '@nestjs/common';

export class StructuralFunctionalCharacteristicByIdNotFoundException extends NotFoundException {
  constructor() {
    super(`Structural functional characteristic with id not found`);
  }
}
