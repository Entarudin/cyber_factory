import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { HostResponse } from '@/hosts/controllers/host.response';
import { HostEntity } from '@/hosts/dao/entity/host.entity';

export class HostListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: HostResponse,
    isArray: true,
  })
  public readonly items: HostResponse[];

  constructor({ meta, items }: PaginatedResult<HostEntity>) {
    this.meta = meta;
    this.items = items.map((host) => new HostResponse(host));
  }
}
