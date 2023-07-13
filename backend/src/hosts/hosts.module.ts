import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '@/devices/devices.module';
import { HostsController } from '@/hosts/controllers/hosts.controller';
import { HostEntity } from '@/hosts/dao/entity/host.entity';
import { HostsRepository } from '@/hosts/repositories/hosts.repository';
import { PostgresHostsRepository } from '@/hosts/repositories/postgres-hosts.repository';
import { HostsService } from '@/hosts/services/hosts.service';

@Module({
  imports: [TypeOrmModule.forFeature([HostEntity]), DevicesModule],
  providers: [
    HostsService,
    {
      provide: HostsRepository,
      useClass: PostgresHostsRepository,
    },
  ],
  exports: [HostsService, HostsRepository],
  controllers: [HostsController],
})
export class HostsModule {}
