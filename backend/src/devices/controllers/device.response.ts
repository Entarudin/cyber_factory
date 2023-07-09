import { ApiProperty } from '@nestjs/swagger';

import { DeviceEntity } from '@/devices/dao/entity/device.entity';

export class DeviceResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly ipAddress: string;

  @ApiProperty()
  public readonly macAddress: string;

  @ApiProperty()
  public readonly networkInterface: string;

  constructor(deviceEntity: DeviceEntity) {
    this.id = deviceEntity.id;
    this.name = deviceEntity.name;
    this.ipAddress = deviceEntity.ipAddress;
    this.macAddress = deviceEntity.macAddress;
    this.networkInterface = deviceEntity.networkInterface;
  }
}
