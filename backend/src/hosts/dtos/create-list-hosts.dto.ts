import { DeviceMacAddressDto } from '@/devices/dtos';
import { HostItemDto } from '@/hosts/dtos';

export class CreateListHostsDto extends DeviceMacAddressDto {
  public readonly items: HostItemDto[];
}
