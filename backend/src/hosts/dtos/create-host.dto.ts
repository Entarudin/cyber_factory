import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateHostDto extends DeviceMacAddressDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly ipAddress: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;
}

export class HostItemDto extends OmitType(CreateHostDto, [
  'deviceMacAddress',
] as const) {}
