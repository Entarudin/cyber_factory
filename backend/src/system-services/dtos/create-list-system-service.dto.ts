import { DeviceMacAddressDto } from '@/devices/dtos';
import { SystemServiceItemDto } from '@/system-services/dtos';

export class CreateListSystemServicesDto extends DeviceMacAddressDto {
  public readonly items: SystemServiceItemDto[];
}
