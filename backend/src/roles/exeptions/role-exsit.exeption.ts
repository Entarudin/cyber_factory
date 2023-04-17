import { BadRequestException } from '@nestjs/common';

export class RoleAlreadyExistByNameExeption extends BadRequestException {
  constructor() {
    super('Role with this name already exists');
  }
}
