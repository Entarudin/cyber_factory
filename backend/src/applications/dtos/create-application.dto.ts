import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateApplicationDto extends DeviceMacAddressDto {
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

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly description: string;
}
export class ApplicationItemDto extends OmitType(CreateApplicationDto, [
  'deviceMacAddress',
] as const) {}
