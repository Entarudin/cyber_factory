import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { StructuralFunctionalCharacteristicItemDto } from '@/structural-functional-characteristics/dtos';

export class CreateListStructuralFunctionalCharacteristicDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  public readonly items: StructuralFunctionalCharacteristicItemDto[];
}
