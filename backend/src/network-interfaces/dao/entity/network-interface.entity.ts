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

@Entity({ name: 'network_interfaces' })
@Unique(['name', 'ipAddress', 'deviceId'])
export class NetworkInterfaceEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  ipAddress: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.networkInterfaces)
  @JoinColumn()
  device: DeviceEntity;
}
