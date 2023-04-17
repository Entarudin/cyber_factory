import { RoleEntity } from '../dao/entity/role.entity';

export abstract class RolesRepository {
  abstract save(role: RoleEntity): Promise<RoleEntity>;
  abstract findAll(): Promise<RoleEntity[]>;
  abstract getById(id: number): Promise<RoleEntity>;
  abstract update(role: RoleEntity): Promise<RoleEntity>;
  abstract delete(id: number): Promise<void>;
}
