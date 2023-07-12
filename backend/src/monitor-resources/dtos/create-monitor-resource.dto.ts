import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

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
  public readonly cpuUsage: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly cpuAvgLoad: number;

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
  public readonly ramUsage: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly swapUsage: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly diskUsage: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly uptime: string;
}

export class MonitorResourceItemDto extends OmitType(CreateMonitorResourceDto, [
  'deviceMacAddress',
] as const) {}
