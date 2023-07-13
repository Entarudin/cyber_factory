import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '@/common/pagination/page.dto';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { HostEntity } from '@/hosts/dao/entity/host.entity';
import { HostsRepository } from '@/hosts/repositories/hosts.repository';

@Injectable()
export class PostgresHostsRepository extends HostsRepository {
  constructor(
    @InjectRepository(HostEntity)
    private readonly repository: Repository<HostEntity>,
  ) {
    super();
  }

  public async save(host: HostEntity): Promise<HostEntity> {
    return this.repository.save(host);
  }

  public async saveList(listHosts: HostEntity[]): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(HostEntity)
      .values(listHosts)
      .orIgnore()
      .execute();

    return;
  }

  public async findAll(): Promise<HostEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<HostEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('hosts');

    queryBuilder
      .orderBy('hosts.created_date', pagination.order)
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

  public async getById(id: number): Promise<HostEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(host: HostEntity): Promise<HostEntity> {
    return this.repository.save(host);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
