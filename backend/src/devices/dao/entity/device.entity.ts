import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
