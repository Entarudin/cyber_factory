import { Injectable, NotImplementedException } from '@nestjs/common';

import { BcryptService } from '@/bcrypt/services';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { RoleByNameNotFoundException } from '@/roles/exceptions';
import { RolesService } from '@/roles/services';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '@/users/dtos';
import { UserByIdNotFoundException } from '@/users/exceptions';
import { UsersRepository } from '@/users/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    const role = await this.getExistRoleByName(dto.role);
    const passwordHash = await this.generatePasswordHash(dto.password);
    const user = new UserEntity();
    user.email = dto.email;
    user.passwordHash = passwordHash;
    user.roles = [role];
    return this.usersRepository.save(user);
  }

  public async findById(id: number): Promise<UserEntity> {
    return this.usersRepository.getById(id);
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.usersRepository.delete(id);
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    throw new NotImplementedException();
  }

  public async getOrFailById(id: number): Promise<UserEntity> {
    const existUser = await this.findById(id);
    if (!existUser) {
      throw new UserByIdNotFoundException();
    }
    return existUser;
  }

  private async getExistRoleByName(roleName: string): Promise<RoleEntity> {
    const existsRole = await this.rolesService.findByName(roleName);
    if (!existsRole) {
      throw new RoleByNameNotFoundException();
    }
    return existsRole;
  }

  private async generatePasswordHash(password: string): Promise<string> {
    return this.bcryptService.generateHash(password);
  }
}
