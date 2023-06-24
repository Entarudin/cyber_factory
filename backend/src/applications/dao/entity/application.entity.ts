import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { DeviceEntity } from '@/devices/dao/entity/device.entity';

@Entity({ name: 'applications' })
@Unique(['name', 'version', 'deviceId'])
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  version: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.applications)
  @JoinColumn()
  device: DeviceEntity;
}
