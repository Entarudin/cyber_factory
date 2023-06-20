import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { MonitorResourcesRepository } from '@/monitor-resources/repositories/monitor-resources.repository';
import { MonitorResourceEntity } from '../dao/entity/monitor-resource.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';

@Injectable()
export class PostgresMonitorResourcesRepository extends MonitorResourcesRepository {
  constructor(
    @InjectRepository(MonitorResourceEntity)
    private readonly repository: Repository<MonitorResourceEntity>,
  ) {
    super();
  }

  public async save(
    monitorResource: MonitorResourceEntity,
  ): Promise<MonitorResourceEntity> {
    return this.repository.save(monitorResource);
  }

  public async findAll(): Promise<MonitorResourceEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<MonitorResourceEntity>> {
    const queryBuilder =
      this.repository.createQueryBuilder('monitor_resources');

    queryBuilder
      .orderBy('monitor_resources.created_date', pagination.order)
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

  public async getById(id: number): Promise<MonitorResourceEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    monitorResource: MonitorResourceEntity,
  ): Promise<MonitorResourceEntity> {
    return this.repository.save(monitorResource);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
