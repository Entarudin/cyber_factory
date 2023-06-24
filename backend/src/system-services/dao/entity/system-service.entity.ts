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

@Entity({ name: 'system_services' })
@Unique(['name', 'status', 'deviceId'])
export class SystemServiceEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.systemServices)
  @JoinColumn()
  device: DeviceEntity;
}
