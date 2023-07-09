import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateSystemServiceDto extends DeviceMacAddressDto {
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
  public readonly status: string;
}

export class SystemServiceItemDto extends OmitType(CreateSystemServiceDto, [
  'deviceMacAddress',
] as const) {}
