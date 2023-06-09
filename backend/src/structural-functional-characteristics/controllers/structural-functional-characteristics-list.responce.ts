import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { StructuralFunctionalCharacteristicResponse } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics.responce';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';

export class StructuralFunctionalCharacteristicListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: StructuralFunctionalCharacteristicResponse,
    isArray: true,
  })
  public readonly items: StructuralFunctionalCharacteristicResponse[];

  constructor({
    meta,
    items,
  }: PaginatedResult<StructuralFunctionalCharacteristicEntity>) {
    this.meta = meta;
    this.items = items.map(
      (structuralFunctionalCharacteristic) =>
        new StructuralFunctionalCharacteristicResponse(
          structuralFunctionalCharacteristic,
        ),
    );
  }
}
