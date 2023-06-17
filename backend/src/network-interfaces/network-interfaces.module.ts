import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '@/devices/devices.module';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';
import { NetworkInterfacesController } from '@/network-interfaces/controllers/network-interfaces.controller';
import { NetworkInterfacesRepository } from '@/network-interfaces/repositories/network-interfaces.repository';
import { PostgresNetworkInterfacesRepository } from '@/network-interfaces/repositories/postgres-network-interfaces.repository';
import { NetworkInterfacesService } from '@/network-interfaces/services/network-interfaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([NetworkInterfaceEntity]), DevicesModule],
  providers: [
    NetworkInterfacesService,
    {
      provide: NetworkInterfacesRepository,
      useClass: PostgresNetworkInterfacesRepository,
    },
  ],
  exports: [NetworkInterfacesService, NetworkInterfacesRepository],
  controllers: [NetworkInterfacesController],
})
export class NetworkInterfacesModule {}
