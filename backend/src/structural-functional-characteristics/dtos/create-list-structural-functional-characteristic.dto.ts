import { DeviceMacAddressDto } from '@/devices/dtos';
import { StructuralFunctionalCharacteristicItemDto } from '@/structural-functional-characteristics/dtos';

export class CreateListStructuralFunctionalCharacteristicDto extends DeviceMacAddressDto {
  public readonly items: StructuralFunctionalCharacteristicItemDto[];
}
