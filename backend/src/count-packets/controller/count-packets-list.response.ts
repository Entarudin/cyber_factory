import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CountPacketsResponse } from '@/count-packets/controller/count-packets.response';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';

export class CountPacketsListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: CountPacketsResponse,
    isArray: true,
  })
  public readonly items: CountPacketsResponse[];

  constructor({ meta, items }: PaginatedResult<CountPacketsEntity>) {
    this.meta = meta;
    this.items = items.map(
      (countPackets) => new CountPacketsResponse(countPackets),
    );
  }
}
