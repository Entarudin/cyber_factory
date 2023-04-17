import { RoleEntity } from '../dao/entity/role.entity';

export abstract class RolesRepository {
  public abstract save(role: RoleEntity): Promise<RoleEntity>;
  public abstract findAll(): Promise<RoleEntity[]>;
  public abstract findByName(name: string): Promise<RoleEntity>;
  public abstract getById(id: number): Promise<RoleEntity>;
  public abstract update(role: RoleEntity): Promise<RoleEntity>;
  public abstract delete(id: number): Promise<void>;
}
