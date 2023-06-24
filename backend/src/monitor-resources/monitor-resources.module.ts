import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '@/devices/devices.module';
import { MonitorResourcesController } from '@/monitor-resources/controllers/monitor-resources.controller';
import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';
import { MonitorResourcesRepository } from '@/monitor-resources/repositories/monitor-resources.repository';
import { PostgresMonitorResourcesRepository } from '@/monitor-resources/repositories/postgres-monitor-resources.repository';
import { MonitorResourcesService } from '@/monitor-resources/services/monitor-resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorResourceEntity]), DevicesModule],
  providers: [
    MonitorResourcesService,
    {
      provide: MonitorResourcesRepository,
      useClass: PostgresMonitorResourcesRepository,
    },
  ],
  exports: [MonitorResourcesService, MonitorResourcesRepository],
  controllers: [MonitorResourcesController],
})
export class MonitorResourcesModule {}
