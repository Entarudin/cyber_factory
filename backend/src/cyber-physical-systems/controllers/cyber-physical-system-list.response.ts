import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';

import { CyberPhysicalSystemResponse } from './cyber-physical-system.response';

export class CyberPhysicalSystemListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: CyberPhysicalSystemResponse,
    isArray: true,
  })
  public readonly items: CyberPhysicalSystemResponse[];

  constructor({ meta, items }: PaginatedResult<CyberPhysicalSystemEntity>) {
    this.meta = meta;
    this.items = items.map((cfs) => new CyberPhysicalSystemResponse(cfs));
  }
}
