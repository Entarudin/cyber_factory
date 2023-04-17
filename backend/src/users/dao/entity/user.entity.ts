import { RoleEntity } from '../../../roles/dao/entity/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar' })
  public passwordHash: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToMany(() => RoleEntity, (RoleEntity) => RoleEntity.users, {
    eager: true,
  })
  @JoinTable()
  public roles!: RoleEntity[];
}
