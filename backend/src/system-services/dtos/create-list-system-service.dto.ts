import { SystemServiceItemDto } from '@/system-services/dtos';
import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateListSystemServicesDto extends DeviceMacAddressDto {
  public readonly items: SystemServiceItemDto[];
}
