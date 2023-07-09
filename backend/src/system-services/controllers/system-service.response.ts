import { ApiProperty } from '@nestjs/swagger';

import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';

export class SystemServiceResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly status: string;

  constructor(systemServiceEntity: SystemServiceEntity) {
    this.id = systemServiceEntity.id;
    this.name = systemServiceEntity.name;
    this.status = systemServiceEntity.status;
  }
}
