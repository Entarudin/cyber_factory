import { BadRequestException } from '@nestjs/common';

export class RoleAlreadyExistByNameException extends BadRequestException {
  constructor() {
    super('Role with this name already exists');
  }
}
