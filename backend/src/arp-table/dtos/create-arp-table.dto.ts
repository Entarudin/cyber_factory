import { ArpTableItemDto } from '@/arp-table/dtos';
import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateArpTableDto extends DeviceMacAddressDto {
  public readonly items: ArpTableItemDto[];
}
