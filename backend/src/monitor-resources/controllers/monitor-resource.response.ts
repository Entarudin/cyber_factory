import { ApiProperty } from '@nestjs/swagger';

import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';

export class MonitorResourceResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly cpuLoad: number;

  @ApiProperty()
  public readonly cpuUsage: number;

  @ApiProperty()
  public readonly cpuAvgLoad: number;

  @ApiProperty()
  public readonly cpuTemperature: number;

  @ApiProperty()
  public readonly ramUsage: number;

  @ApiProperty()
  public readonly swapUsage: number;

  @ApiProperty()
  public readonly diskUsage: number;

  @ApiProperty()
  public readonly uptime: string;

  constructor(monitorResourceEntity: MonitorResourceEntity) {
    this.id = monitorResourceEntity.id;
    this.cpuLoad = monitorResourceEntity.cpuLoad;
    this.cpuUsage = monitorResourceEntity.cpuUsage;
    this.cpuAvgLoad = monitorResourceEntity.cpuAvgLoad;
    this.cpuTemperature = monitorResourceEntity.cpuTemperature;
    this.ramUsage = monitorResourceEntity.ramUsage;
    this.swapUsage = monitorResourceEntity.swapUsage;
    this.diskUsage = monitorResourceEntity.diskUsage;
    this.uptime = monitorResourceEntity.uptime;
  }
}
