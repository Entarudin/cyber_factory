import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesRepository } from '@/roles/repositories/roles.repository';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { RolesEnum } from '@/common/roles.enum';

@Injectable()
export class PostrgresRolesRepository extends RolesRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {
    super();
  }

  public async save(role: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(role);
  }

  public async findAll(): Promise<RoleEntity[]> {
    return this.repository.find({});
  }

  public async getById(id: number): Promise<RoleEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(role: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(role);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public findByName(name: string): Promise<RoleEntity> {
    return this.repository.findOne({
      where: {
        name: name as RolesEnum,
      },
    });
  }
}
