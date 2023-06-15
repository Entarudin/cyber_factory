import { ApiProperty } from '@nestjs/swagger';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';

export class ApplicationResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly version: string;

  @ApiProperty()
  public readonly description: string;

  constructor(applicationEntity: ApplicationEntity) {
    this.id = applicationEntity.id;
    this.name = applicationEntity.name;
    this.version = applicationEntity.version;
    this.description = applicationEntity.description;
  }
}
