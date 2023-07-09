import { DeviceMacAddressDto } from '@/devices/dtos';
import { NetworkInterfaceItemDto } from '@/network-interfaces/dtos';

export class CreateListNetworkInterfacesDto extends DeviceMacAddressDto {
  public readonly items: NetworkInterfaceItemDto[];
}
