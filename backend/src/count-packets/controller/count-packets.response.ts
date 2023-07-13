import { ApiProperty } from '@nestjs/swagger';

import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';

export class CountPacketsResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly timing: number;

  @ApiProperty()
  public readonly allProtoCount: number;

  @ApiProperty()
  public readonly tcpCount: number;

  @ApiProperty()
  public readonly udpCount: number;

  @ApiProperty()
  public readonly httpRequestCount: number;

  @ApiProperty()
  public readonly httpResponseCount: number;

  @ApiProperty()
  public readonly arpCount: number;

  @ApiProperty()
  public readonly icmpCount: number;

  @ApiProperty()
  public readonly modbus01RequestCount: number;

  @ApiProperty()
  public readonly modbus02RequestCount: number;

  @ApiProperty()
  public readonly modbus03RequestCount: number;

  @ApiProperty()
  public readonly modbus04RequestCount: number;

  @ApiProperty()
  public readonly modbus05RequestCount: number;

  @ApiProperty()
  public readonly modbus06RequestCount: number;

  @ApiProperty()
  public readonly modbus15RequestCount: number;

  @ApiProperty()
  public readonly modbus16RequestCount: number;

  @ApiProperty()
  public readonly modbus01ResponseCount: number;

  @ApiProperty()
  public readonly modbus02ResponseCount: number;

  @ApiProperty()
  public readonly modbus03ResponseCount: number;

  @ApiProperty()
  public readonly modbus04ResponseCount: number;

  @ApiProperty()
  public readonly modbus05ResponseCount: number;

  @ApiProperty()
  public readonly modbus06ResponseCount: number;

  @ApiProperty()
  public readonly modbus15ResponseCount: number;

  @ApiProperty()
  public readonly modbus16ResponseCount: number;

  constructor(countPackets: CountPacketsEntity) {
    this.id = countPackets.id;
    this.timing = countPackets.timing;
    this.allProtoCount = countPackets.allProtoCount;
    this.tcpCount = countPackets.tcpCount;
    this.udpCount = countPackets.udpCount;
    this.httpRequestCount = countPackets.httpRequestCount;
    this.httpResponseCount = countPackets.httpResponseCount;
    this.arpCount = countPackets.arpCount;
    this.icmpCount = countPackets.icmpCount;
    this.modbus01RequestCount = countPackets.modbus01RequestCount;
    this.modbus02RequestCount = countPackets.modbus02RequestCount;
    this.modbus03RequestCount = countPackets.modbus03RequestCount;
    this.modbus04RequestCount = countPackets.modbus04RequestCount;
    this.modbus05RequestCount = countPackets.modbus05RequestCount;
    this.modbus06RequestCount = countPackets.modbus06RequestCount;
    this.modbus15RequestCount = countPackets.modbus15RequestCount;
    this.modbus16RequestCount = countPackets.modbus16RequestCount;
    this.modbus01ResponseCount = countPackets.modbus01ResponseCount;
    this.modbus02ResponseCount = countPackets.modbus02ResponseCount;
    this.modbus03ResponseCount = countPackets.modbus03ResponseCount;
    this.modbus04ResponseCount = countPackets.modbus04ResponseCount;
    this.modbus05ResponseCount = countPackets.modbus05ResponseCount;
    this.modbus06ResponseCount = countPackets.modbus06ResponseCount;
    this.modbus15ResponseCount = countPackets.modbus15ResponseCount;
    this.modbus16ResponseCount = countPackets.modbus16ResponseCount;
  }
}
