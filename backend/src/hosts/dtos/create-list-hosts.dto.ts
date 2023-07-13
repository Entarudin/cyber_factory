import { DeviceMacAddressDto } from '@/devices/dtos';
import { HostItemDto } from '@/hosts/dtos';

export class CreateArpTableDto extends DeviceMacAddressDto {
  public readonly items: HostItemDto[];
}
