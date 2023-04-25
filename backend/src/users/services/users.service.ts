import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersRepository } from '@/users/repositories/users.repository';
import { RolesService } from '@/roles/services';
import { CreateUserDto, UpdateUserDto } from '@/users/dtos';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { BcryptService } from '@/bcrypt/services';
import { UserByIdNotFoundException } from '@/users/exceptions';
import { RoleByNameNotFoundException } from '@/roles/exceptions';
import { RoleEntity } from '@/roles/dao/entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    const role = await this.getRoleExistByName(dto.role);
    const passwordHash = await this.generatePasswordHash(dto.passwordHash);
    const user = new UserEntity();
    user.email = dto.email;
    user.passwordHash = passwordHash;
    user.roles = [role];
    return await this.usersRepository.save(user);
  }

  public async findById(id: number): Promise<UserEntity> {
    return await this.usersRepository.getById(id);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getUserExistById(id);
    await this.usersRepository.delete(id);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findByEmail(email);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    throw new NotImplementedException();
  }

  private async getUserExistById(id: number): Promise<UserEntity> {
    const existUser = await this.findById(id);
    if (!existUser) {
      throw new UserByIdNotFoundException();
    }
    return existUser;
  }

  private async getRoleExistByName(roleName: string): Promise<RoleEntity> {
    const existsRole = await this.rolesService.findByName(roleName);
    if (!existsRole) {
      throw new RoleByNameNotFoundException();
    }
    return existsRole;
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const passwordHash = await this.bcryptService.generateHash(password);
    return passwordHash;
  }
}
