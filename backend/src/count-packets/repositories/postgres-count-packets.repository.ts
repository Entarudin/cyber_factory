import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '@/common/pagination/page.dto';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';
import { CountPacketsRepository } from '@/count-packets/repositories/count-packets.repository';

@Injectable()
export class PostgresCountPacketsRepository extends CountPacketsRepository {
  constructor(
    @InjectRepository(CountPacketsEntity)
    private readonly repository: Repository<CountPacketsEntity>,
  ) {
    super();
  }

  public async save(
    countPackets: CountPacketsEntity,
  ): Promise<CountPacketsEntity> {
    return this.repository.save(countPackets);
  }

  public async findAll(): Promise<CountPacketsEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CountPacketsEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('count_packets');

    queryBuilder
      .orderBy('count_packets.created_date', pagination.order)
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

  public async getById(id: number): Promise<CountPacketsEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    countPackets: CountPacketsEntity,
  ): Promise<CountPacketsEntity> {
    return this.repository.save(countPackets);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
