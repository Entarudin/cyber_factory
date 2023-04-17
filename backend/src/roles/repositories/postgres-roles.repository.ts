import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesRepository } from './roles.repository';
import { RoleEntity } from '../dao/entity/role.entity';

@Injectable()
export class PostrgresRolesRepository extends RolesRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {
    super();
  }

  public async save(role: RoleEntity): Promise<RoleEntity> {
    return await this.repository.save(role);
  }

  public async findAll(): Promise<RoleEntity[]> {
    return await this.repository.find({});
  }

  public async getById(id: number): Promise<RoleEntity> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(role: RoleEntity): Promise<RoleEntity> {
    return await this.repository.save(role);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
