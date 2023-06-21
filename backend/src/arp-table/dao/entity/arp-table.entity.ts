import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'arp_table' })
@Unique(['ipAddress', 'macAddress', 'deviceId'])
export class ArpTableItemEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  ipAddress: string;

  @Column({ type: 'varchar' })
  macAddress: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.arpTable)
  @JoinColumn()
  device: DeviceEntity;
}

export type ArpTable = ArpTableItemEntity[];
