import { PartialType } from '@nestjs/swagger';
import { StructuralFunctionalCharacteristicItemDto } from '@/structural-functional-characteristics/dtos';

export class UpdateStructuralFunctionalCharacteristicDto extends PartialType(
  StructuralFunctionalCharacteristicItemDto,
) {}
