import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DeviceEntity } from '@/devices/dao/entity/device.entity';

@Entity({ name: 'monitor_resources' })
export class MonitorResourceEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'decimal' })
  cpuLoad: number;

  @Column({ type: 'decimal' })
  cpuUsage: number;

  @Column({ type: 'decimal' })
  cpuAvgLoad: number;

  @Column({ type: 'decimal' })
  cpuTemperature: number;

  @Column({ type: 'decimal' })
  ramUsage: number;

  @Column({ type: 'decimal' })
  swapUsage: number;

  @Column({ type: 'decimal' })
  diskUsage: number;

  @Column({ type: 'varchar' })
  uptime: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.monitorResources)
  @JoinColumn()
  device: DeviceEntity;
}
