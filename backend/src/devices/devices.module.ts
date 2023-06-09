import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { CyberPhysicalSystemsModule } from '@/cyber-physical-systems/cyber-physical-systems.module';
import { DevicesService } from '@/devices/services/devices.service';
import { DevicesRepository } from '@/devices/repositories/devices.repository';
import { PostgresDevicesRepository } from '@/devices/repositories/postgres-devices.repository';
import { DevicesController } from '@/devices/controllers/devices.controller';

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
