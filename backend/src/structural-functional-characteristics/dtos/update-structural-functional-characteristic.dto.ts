import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateStructuralFunctionalCharacteristicDto } from '@/structural-functional-characteristics/dtos';

export class UpdateStructuralFunctionalCharacteristicDto extends PartialType(
  OmitType(CreateStructuralFunctionalCharacteristicDto, [
    'macAddress',
  ] as const),
) {}
