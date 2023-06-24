import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { DeviceResponse } from '@/devices/controllers/device.response';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';

export class DeviceListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: DeviceResponse,
    isArray: true,
  })
  public readonly items: DeviceResponse[];

  constructor({ meta, items }: PaginatedResult<DeviceEntity>) {
    this.meta = meta;
    this.items = items.map((device) => new DeviceResponse(device));
  }
}
