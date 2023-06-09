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

@Entity({ name: 'structural_functional_characteristics' })
@Unique(['name', 'version', 'deviceId'])
export class StructuralFunctionalCharacteristicEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  version: string;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(
    () => DeviceEntity,
    (device) => device.structuralFunctionalCharacteristics,
  )
  @JoinColumn()
  device: DeviceEntity;
}
