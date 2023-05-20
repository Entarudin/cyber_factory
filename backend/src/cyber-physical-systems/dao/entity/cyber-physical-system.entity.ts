import { UserEntity } from '@/users/dao/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cyber_physical_systems' })
export class CyberPhysicalSystemEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.cyberPhysicalSystems)
  users!: UserEntity[];
}
