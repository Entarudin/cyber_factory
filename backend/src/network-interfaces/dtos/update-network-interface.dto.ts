import { PartialType } from '@nestjs/swagger';

import { NetworkInterfaceItemDto } from '@/network-interfaces/dtos';

export class UpdateNetworkInterfaceDto extends PartialType(
  NetworkInterfaceItemDto,
) {}
