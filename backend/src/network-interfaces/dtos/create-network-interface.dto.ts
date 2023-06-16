import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateNetworkInterfaceDto {
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
  public readonly ipAddress: string;
}

export class NetworkInterfaceItemDto extends OmitType(
  CreateNetworkInterfaceDto,
  ['macAddress'] as const,
) {}
