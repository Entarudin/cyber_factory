import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArpTableItemEntity } from '@/arp-table/dao/entity/arp-table.entity';
import { DevicesModule } from '@/devices/devices.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArpTableItemEntity]), DevicesModule],
})
export class ArpTableModule {}
