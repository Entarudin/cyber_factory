import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountPacketsController } from '@/count-packets/controller/count-packets.controller';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';
import { CountPacketsRepository } from '@/count-packets/repositories/count-packets.repository';
import { PostgresCountPacketsRepository } from '@/count-packets/repositories/postgres-count-packets.repository';
import { CountPacketsService } from '@/count-packets/services/count-packets.service';
import { DevicesModule } from '@/devices/devices.module';

@Module({
  imports: [TypeOrmModule.forFeature([CountPacketsEntity]), DevicesModule],
  providers: [
    CountPacketsService,
    {
      provide: CountPacketsRepository,
      useClass: PostgresCountPacketsRepository,
    },
  ],
  exports: [CountPacketsService, CountPacketsRepository],
  controllers: [CountPacketsController],
})
export class CountPacketsModule {}
