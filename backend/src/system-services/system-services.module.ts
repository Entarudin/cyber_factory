import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '@/devices/devices.module';
import { SystemServicesController } from '@/system-services/controllers/system-services.controller';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';
import { PostgresSystemServicesRepository } from '@/system-services/repositories/postgres-system-services.repository';
import { SystemServicesRepository } from '@/system-services/repositories/system-services.repository';
import { SystemServicesService } from '@/system-services/services/system-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemServiceEntity]), DevicesModule],
  providers: [
    SystemServicesService,
    {
      provide: SystemServicesRepository,
      useClass: PostgresSystemServicesRepository,
    },
  ],
  exports: [SystemServicesService, SystemServicesRepository],
  controllers: [SystemServicesController],
})
export class SystemServicesModule {}
