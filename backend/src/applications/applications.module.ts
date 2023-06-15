import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '@/devices/devices.module';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { ApplicationsRepository } from '@/applications/repositories/applications.repository';
import { PostgresApplicationsRepository } from '@/applications/repositories/postgres-applications.repository';
import { ApplicationsController } from '@/applications/controllers/applications.controller';
import { ApplicationsService } from '@/applications/services/applications.service';

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
