import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesController } from '@/devices/controllers/devices.controller';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesRepository } from '@/devices/repositories/devices.repository';
import { PostgresDevicesRepository } from '@/devices/repositories/postgres-devices.repository';
import { DevicesService } from '@/devices/services/devices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity]),
    CyberPhysicalSystemsModule,
  ],
  providers: [
    DevicesService,
    {
      provide: DevicesRepository,
      useClass: PostgresDevicesRepository,
    },
  ],
  exports: [DevicesService, DevicesRepository],
  controllers: [DevicesController],
})
export class DevicesModule {}
