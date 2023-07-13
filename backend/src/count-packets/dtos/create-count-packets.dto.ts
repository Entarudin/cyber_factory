import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

import { DeviceMacAddressDto } from '@/devices/dtos';

export class CreateCountPacketsDto extends DeviceMacAddressDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly timing: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly allProtoCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly tcpCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly udpCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly httpRequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly httpResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly arpCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly icmpCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus01RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus02RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus03RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus04RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus05RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus06RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus15RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus16RequestCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus01ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus02ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus03ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus04ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus05ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus06ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus15ResponseCount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly modbus16ResponseCount: number;
}

export class CountPacketsItemDto extends OmitType(CreateCountPacketsDto, [
  'deviceMacAddress',
] as const) {}
