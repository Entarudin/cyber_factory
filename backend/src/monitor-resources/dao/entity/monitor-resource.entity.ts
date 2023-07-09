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

  @Column()
  cpuLoad: number;

  @Column()
  ramLoad: number;

  @Column()
  cpuTemperature: number;

  @Column()
  countTransmittedUdpPackets: number;

  @Column()
  countTransmittedTcpPackets: number;

  @Column()
  countTransmittedArpPackets: number;

  @Column()
  diskLoad: number;

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
