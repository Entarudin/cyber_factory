import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DeviceEntity } from '@/devices/dao/entity/device.entity';

@Entity({ name: 'count_packets' })
export class CountPacketsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  timing: number;

  @Column()
  allProtoCount: number;

  @Column()
  tcpCount: number;

  @Column()
  udpCount: number;

  @Column()
  httpRequestCount: number;

  @Column()
  httpResponseCount: number;

  @Column()
  arpCount: number;

  @Column()
  icmpCount: number;

  @Column()
  modbus01RequestCount: number;

  @Column()
  modbus02RequestCount: number;

  @Column()
  modbus03RequestCount: number;

  @Column()
  modbus04RequestCount: number;

  @Column()
  modbus05RequestCount: number;

  @Column()
  modbus06RequestCount: number;

  @Column()
  modbus15RequestCount: number;

  @Column()
  modbus16RequestCount: number;

  @Column()
  modbus01ResponseCount: number;

  @Column()
  modbus02ResponseCount: number;

  @Column()
  modbus03ResponseCount: number;

  @Column()
  modbus04ResponseCount: number;

  @Column()
  modbus05ResponseCount: number;

  @Column()
  modbus06ResponseCount: number;

  @Column()
  modbus15ResponseCount: number;

  @Column()
  modbus16ResponseCount: number;

  @Column()
  deviceId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(() => DeviceEntity, (device) => device.countPackets)
  @JoinColumn()
  device: DeviceEntity;
}
