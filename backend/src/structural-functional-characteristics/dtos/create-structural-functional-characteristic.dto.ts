import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateStructuralFunctionalCharacteristicDto extends DeviceMacAddressDto {
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
  ['deviceMacAddress'] as const,
) {}
