import { ApiProperty } from '@nestjs/swagger';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { CyberPhysicalSystemResponse } from './cyber-physical-system.response';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';

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
