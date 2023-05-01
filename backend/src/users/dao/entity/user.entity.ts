import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
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

  @OneToMany(() => TokenPairEntity, (token) => token.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'userId' })
  tokens!: TokenPairEntity[];
}
