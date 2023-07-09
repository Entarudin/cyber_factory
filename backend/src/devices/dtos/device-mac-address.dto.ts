import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class DeviceMacAddressDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly deviceMacAddress: string;
}
