import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StructuralFunctionalCharacteristicsRepository } from './structural-functional-characteristics.repository';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { StructuralFunctionalCharacteristicEntity } from '../dao/entity/structural-functional-characteristic.entity';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';

@Injectable()
export class PostgresDevicesRepository extends StructuralFunctionalCharacteristicsRepository {
  constructor(
    @InjectRepository(StructuralFunctionalCharacteristicEntity)
    private readonly repository: Repository<StructuralFunctionalCharacteristicEntity>,
  ) {
    super();
  }

  public async save(
    structuralFunctionalCharacteristic: StructuralFunctionalCharacteristicEntity,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    return this.repository.save(structuralFunctionalCharacteristic);
  }

  public async saveList(
    listStructuralFunctionalCharacteristics: StructuralFunctionalCharacteristicEntity[],
  ): Promise<StructuralFunctionalCharacteristicEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<StructuralFunctionalCharacteristicEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<StructuralFunctionalCharacteristicEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('sfc');

    queryBuilder
      .orderBy('sfc.created_date', pagination.order)
      .skip(pagination.skip)
      .take(pagination.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pagination,
      itemCount,
    });

    return new PageDto(entities, pageMetaDto);
  }

  public async getById(
    id: number,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    structuralFunctionalCharacteristic: StructuralFunctionalCharacteristicEntity,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    return this.repository.save(structuralFunctionalCharacteristic);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
