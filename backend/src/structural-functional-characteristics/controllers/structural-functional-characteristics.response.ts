import { ApiProperty } from '@nestjs/swagger';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';

export class StructuralFunctionalCharacteristicResponse {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly version: string;

  constructor(
    structuralFunctionalCharacteristicEntity: StructuralFunctionalCharacteristicEntity,
  ) {
    this.id = structuralFunctionalCharacteristicEntity.id;
    this.name = structuralFunctionalCharacteristicEntity.name;
    this.version = structuralFunctionalCharacteristicEntity.version;
  }
}
