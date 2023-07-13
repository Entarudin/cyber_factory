import { ApiProperty } from '@nestjs/swagger';

import { HostEntity } from '@/hosts/dao/entity/host.entity';

export class HostResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly ipAddress: string;

  @ApiProperty()
  public readonly macAddress: string;

  constructor(hostEntity: HostEntity) {
    this.id = hostEntity.id;
    this.ipAddress = hostEntity.ipAddress;
    this.macAddress = hostEntity.macAddress;
  }
}
