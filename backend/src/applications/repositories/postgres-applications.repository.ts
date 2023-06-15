import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { ApplicationsRepository } from '@/applications/repositories/applications.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';

@Injectable()
export class PostgresApplicationsRepository extends ApplicationsRepository {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repository: Repository<ApplicationEntity>,
  ) {
    super();
  }

  public async save(
    application: ApplicationEntity,
  ): Promise<ApplicationEntity> {
    return this.repository.save(application);
  }

  public async saveList(listApplications: ApplicationEntity[]): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(ApplicationEntity)
      .values(listApplications)
      .orIgnore()
      .execute();

    return;
  }

  public async findAll(): Promise<ApplicationEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ApplicationEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('applications');

    queryBuilder
      .orderBy('applications.created_date', pagination.order)
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

  public async getById(id: number): Promise<ApplicationEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    application: ApplicationEntity,
  ): Promise<ApplicationEntity> {
    return this.repository.save(application);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
