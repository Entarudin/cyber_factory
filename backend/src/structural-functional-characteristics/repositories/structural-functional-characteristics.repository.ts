import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';

export abstract class StructuralFunctionalCharacteristicsRepository {
  public abstract save(
    structuralFunctionalCharacteristic: StructuralFunctionalCharacteristicEntity,
  ): Promise<StructuralFunctionalCharacteristicEntity>;

  public abstract saveList(
    listStructuralFunctionalCharacteristics: StructuralFunctionalCharacteristicEntity[],
  ): Promise<void>;

  public abstract findAll(): Promise<
    StructuralFunctionalCharacteristicEntity[]
  >;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<StructuralFunctionalCharacteristicEntity>>;

  public abstract getById(
    id: number,
  ): Promise<StructuralFunctionalCharacteristicEntity>;

  public abstract update(
    structuralFunctionalCharacteristic: StructuralFunctionalCharacteristicEntity,
  ): Promise<StructuralFunctionalCharacteristicEntity>;

  public abstract delete(id: number): Promise<void>;
}
