import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateMonitorResourceDto extends DeviceMacAddressDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly cpuLoad: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly ramLoad: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly cpuTemperature: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly countTransmittedUdpPackets: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly countTransmittedTcpPackets: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly countTransmittedArpPackets: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly diskLoad: number;
}

export class MonitorResourceItemDto extends OmitType(CreateMonitorResourceDto, [
  'deviceMacAddress',
] as const) {}
