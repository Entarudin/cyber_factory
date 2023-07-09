import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { SystemServiceResponse } from '@/system-services/controllers/system-service.response';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';

export class SystemServicesListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: SystemServiceResponse,
    isArray: true,
  })
  public readonly items: SystemServiceResponse[];

  constructor({ meta, items }: PaginatedResult<SystemServiceEntity>) {
    this.meta = meta;
    this.items = items.map(
      (systemService) => new SystemServiceResponse(systemService),
    );
  }
}
