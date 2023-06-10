import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateStructuralFunctionalCharacteristicDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly version: string;
}

export class StructuralFunctionalCharacteristicItemDto extends OmitType(
  CreateStructuralFunctionalCharacteristicDto,
  ['macAddress'] as const,
) {}
