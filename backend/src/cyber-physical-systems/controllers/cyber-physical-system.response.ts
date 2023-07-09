import { ApiProperty } from '@nestjs/swagger';

import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';

export class CyberPhysicalSystemResponse {
  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly id: number;

  constructor(cyberPhysicalSystemEntity: CyberPhysicalSystemEntity) {
    this.id = cyberPhysicalSystemEntity.id;
    this.name = cyberPhysicalSystemEntity.name;
  }
}
