import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsController } from '@/applications/controllers/applications.controller';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { ApplicationsRepository } from '@/applications/repositories/applications.repository';
import { PostgresApplicationsRepository } from '@/applications/repositories/postgres-applications.repository';
import { ApplicationsService } from '@/applications/services/applications.service';
import { DevicesModule } from '@/devices/devices.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity]), DevicesModule],
  providers: [
    ApplicationsService,
    {
      provide: ApplicationsRepository,
      useClass: PostgresApplicationsRepository,
    },
  ],
  exports: [ApplicationsService, ApplicationsRepository],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
