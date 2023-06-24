import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '@/common/pagination/page.dto';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';

import { StructuralFunctionalCharacteristicEntity } from '../dao/entity/structural-functional-characteristic.entity';
import { StructuralFunctionalCharacteristicsRepository } from './structural-functional-characteristics.repository';

@Injectable()
export class PostgresStructuralFunctionalCharacteristicsRepository extends StructuralFunctionalCharacteristicsRepository {
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

  public saveList(
    listStructuralFunctionalCharacteristics: StructuralFunctionalCharacteristicEntity[],
  ): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(StructuralFunctionalCharacteristicEntity)
      .values(listStructuralFunctionalCharacteristics)
      .orIgnore()
      .execute();

    return;
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
