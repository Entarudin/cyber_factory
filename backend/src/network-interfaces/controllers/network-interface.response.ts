import { ApiProperty } from '@nestjs/swagger';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';

export class NetworkInterfaceResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly ipAddress: string;

  constructor(networkInterfaceEntity: NetworkInterfaceEntity) {
    this.id = networkInterfaceEntity.id;
    this.name = networkInterfaceEntity.name;
    this.ipAddress = networkInterfaceEntity.ipAddress;
  }
}
