import { ApiProperty } from '@nestjs/swagger';

import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';

export class MonitorResourceResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly cpuLoad: number;

  @ApiProperty()
  public readonly ramLoad: number;

  @ApiProperty()
  public readonly cpuTemperature: number;

  @ApiProperty()
  public readonly countTransmittedUdpPackets: number;

  @ApiProperty()
  public readonly countTransmittedTcpPackets: number;

  @ApiProperty()
  public readonly countTransmittedArpPackets: number;

  @ApiProperty()
  public readonly diskLoad: number;

  constructor(monitorResourceEntity: MonitorResourceEntity) {
    this.id = monitorResourceEntity.id;
    this.cpuLoad = monitorResourceEntity.cpuLoad;
    this.ramLoad = monitorResourceEntity.ramLoad;
    this.cpuTemperature = monitorResourceEntity.cpuTemperature;
    this.countTransmittedTcpPackets =
      monitorResourceEntity.countTransmittedTcpPackets;
    this.countTransmittedUdpPackets =
      monitorResourceEntity.countTransmittedUdpPackets;
    this.countTransmittedArpPackets =
      monitorResourceEntity.countTransmittedArpPackets;
    this.diskLoad = monitorResourceEntity.diskLoad;
  }
}
