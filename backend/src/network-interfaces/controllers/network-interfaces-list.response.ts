import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { NetworkInterfaceResponse } from '@/network-interfaces/controllers/network-interface.response';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';

export class NetworkInterfacesListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: NetworkInterfaceResponse,
    isArray: true,
  })
  public readonly items: NetworkInterfaceResponse[];

  constructor({ meta, items }: PaginatedResult<NetworkInterfaceEntity>) {
    this.meta = meta;
    this.items = items.map(
      (networkInterface) => new NetworkInterfaceResponse(networkInterface),
    );
  }
}
