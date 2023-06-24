import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArpTableController } from '@/arp-table/controllers/arp-table.controller';
import { ArpTableItemEntity } from '@/arp-table/dao/entity/arp-table.entity';
import { ArpTableRepository } from '@/arp-table/repositories/arp-table.repository';
import { PostgresArpTableRepository } from '@/arp-table/repositories/postgres-arp-table.repository';
import { ArpTableService } from '@/arp-table/services/arp-table.service';
import { DevicesModule } from '@/devices/devices.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArpTableItemEntity]), DevicesModule],
  providers: [
    ArpTableService,
    {
      provide: ArpTableRepository,
      useClass: PostgresArpTableRepository,
    },
  ],
  exports: [ArpTableService, ArpTableRepository],
  controllers: [ArpTableController],
})
export class ArpTableModule {}
