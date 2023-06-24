import { ApiProperty } from '@nestjs/swagger';

import { ArpTableItemEntity } from '@/arp-table/dao/entity/arp-table.entity';

export class ArpTableItemResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly ipAddress: string;

  @ApiProperty()
  public readonly macAddress: string;

  constructor(arpTableItemEntity: ArpTableItemEntity) {
    this.id = arpTableItemEntity.id;
    this.ipAddress = arpTableItemEntity.ipAddress;
    this.macAddress = arpTableItemEntity.macAddress;
  }
}
