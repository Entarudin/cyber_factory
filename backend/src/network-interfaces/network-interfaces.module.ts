import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '@/devices/devices.module';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NetworkInterfaceEntity]), DevicesModule],
})
export class NetworkInterfacesModule {}
