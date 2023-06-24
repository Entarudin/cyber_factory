import { StructuralFunctionalCharacteristicItemDto } from '@/structural-functional-characteristics/dtos';
import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateListStructuralFunctionalCharacteristicDto extends DeviceMacAddressDto {
  public readonly items: StructuralFunctionalCharacteristicItemDto[];
}
