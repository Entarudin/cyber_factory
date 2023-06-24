import { NetworkInterfaceItemDto } from '@/network-interfaces/dtos';
import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateListNetworkInterfacesDto extends DeviceMacAddressDto {
  public readonly items: NetworkInterfaceItemDto[];
}
