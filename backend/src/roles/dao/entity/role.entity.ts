import { RolesEnum } from '../../../common/roles.enum';
import { UserEntity } from '../../../users/dao/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
  public name: RolesEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.roles)
  users!: UserEntity[];
}
