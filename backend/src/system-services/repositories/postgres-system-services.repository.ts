import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { SystemServicesRepository } from '@/system-services/repositories/system-services.repository';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';

@Injectable()
export class PostgresSystemServicesRepository extends SystemServicesRepository {
  constructor(
    @InjectRepository(SystemServiceEntity)
    private readonly repository: Repository<SystemServiceEntity>,
  ) {
    super();
  }

  public async save(
    systemService: SystemServiceEntity,
  ): Promise<SystemServiceEntity> {
    return this.repository.save(systemService);
  }

  public async saveList(
    listSystemService: SystemServiceEntity[],
  ): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(SystemServiceEntity)
      .values(listSystemService)
      .orIgnore()
      .execute();

    return;
  }

  public async findAll(): Promise<SystemServiceEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<SystemServiceEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('system_services');

    queryBuilder
      .orderBy('system_services.created_date', pagination.order)
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

  public async getById(id: number): Promise<SystemServiceEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    systemService: SystemServiceEntity,
  ): Promise<SystemServiceEntity> {
    return this.repository.save(systemService);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
