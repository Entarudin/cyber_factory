import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToMany(() => RoleEntity, (RoleEntity) => RoleEntity.users, {
    eager: true,
  })
  @JoinTable()
  roles!: RoleEntity[];

  @ManyToMany(
    () => CyberPhysicalSystemEntity,
    (CyberPhysicalSystemEntity) => CyberPhysicalSystemEntity.users,
  )
  @JoinTable()
  cyberPhysicalSystems!: CyberPhysicalSystemEntity[];

  @OneToMany(() => TokenPairEntity, (token) => token.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  tokens!: TokenPairEntity[];
}
