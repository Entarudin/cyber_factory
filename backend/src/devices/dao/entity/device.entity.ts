import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import {
  ArpTable,
  ArpTableItemEntity,
} from '@/arp-table/dao/entity/arp-table.entity';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { HostEntity } from '@/hosts/dao/entity/host.entity';
import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  ipAddress: string;

  @Column({ type: 'varchar', unique: true })
  macAddress: string;

  @Column({ type: 'varchar' })
  networkInterface: string;

  @Column()
  cyberPhysicalSystemId!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @ManyToOne(
    () => CyberPhysicalSystemEntity,
    (cyberPhysicalSystem) => cyberPhysicalSystem.devices,
  )
  @JoinColumn()
  cyberPhysicalSystem: CyberPhysicalSystemEntity;

  @OneToMany(
    () => StructuralFunctionalCharacteristicEntity,
    (structuralFunctionalCharacteristic) =>
      structuralFunctionalCharacteristic.device,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  structuralFunctionalCharacteristics!: StructuralFunctionalCharacteristicEntity[];

  @OneToMany(
    () => SystemServiceEntity,
    (systemService) => systemService.device,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  systemServices!: SystemServiceEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.device, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  applications!: ApplicationEntity[];

  @OneToMany(
    () => NetworkInterfaceEntity,
    (networkInterface) => networkInterface.device,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  networkInterfaces!: NetworkInterfaceEntity[];

  @OneToMany(
    () => MonitorResourceEntity,
    (monitorResource) => monitorResource.device,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  monitorResources!: MonitorResourceEntity[];

  @OneToMany(() => ArpTableItemEntity, (arpTableItem) => arpTableItem.device, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  arpTable!: ArpTable;

  @OneToMany(() => CountPacketsEntity, (countPackets) => countPackets.device, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  countPackets!: CountPacketsEntity[];

  @OneToMany(() => HostEntity, (host) => host.device, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  hosts!: HostEntity[];
}
