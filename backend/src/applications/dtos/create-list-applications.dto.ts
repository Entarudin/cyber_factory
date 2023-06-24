import { ApplicationItemDto } from '@/applications/dtos';
import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateListApplicationsDto extends DeviceMacAddressDto {
  public readonly items: ApplicationItemDto[];
}
