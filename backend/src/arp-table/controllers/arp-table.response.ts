import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { ArpTableItemResponse } from '@/arp-table/controllers/arp-table-item.response';
import { ArpTableItemEntity } from '@/arp-table/dao/entity/arp-table.entity';

export class ArpTableResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: ArpTableItemResponse,
    isArray: true,
  })
  public readonly items: ArpTableItemResponse[];

  constructor({ meta, items }: PaginatedResult<ArpTableItemEntity>) {
    this.meta = meta;
    this.items = items.map(
      (arpTableItem) => new ArpTableItemResponse(arpTableItem),
    );
  }
}
