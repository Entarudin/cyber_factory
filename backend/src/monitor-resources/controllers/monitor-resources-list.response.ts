import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { MonitorResourceResponse } from '@/monitor-resources/controllers/monitor-resource.response';
import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';

export class MonitorResourcesListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: MonitorResourceResponse,
    isArray: true,
  })
  public readonly items: MonitorResourceResponse[];

  constructor({ meta, items }: PaginatedResult<MonitorResourceEntity>) {
    this.meta = meta;
    this.items = items.map(
      (monitorResource) => new MonitorResourceResponse(monitorResource),
    );
  }
}
