import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../dao/entity/role.entity';
import {
  RoleAlreadyExistByNameExeption,
  RoleByIdNotFoundExeption,
} from './../exeptions';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async findByName(name: string): Promise<RoleEntity> {
    return await this.rolesRepository.findByName(name);
  }

  public async delete(id: number): Promise<void> {
    await this.checkExistRoleById(id);
    await this.rolesRepository.delete(id);
  }

  public async findAll(): Promise<RoleEntity[]> {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }

  private async checkExistRoleById(id: number): Promise<RoleEntity> {
    const existsRole = await this.rolesRepository.getById(id);
    if (!existsRole) {
      throw new RoleByIdNotFoundExeption();
    }
    return existsRole;
  }

  private async checkExistRoleByName(name: string): Promise<RoleEntity> {
    const existsRole = await this.findByName(name);
    if (existsRole) {
      throw new RoleAlreadyExistByNameExeption();
    }
    return existsRole;
  }
}
