import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RolesEnum } from '@/common/constants/roles.enum';
import { UserEntity } from '@/users/dao/entity/user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
  name: RolesEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.roles)
  users!: UserEntity[];
}
