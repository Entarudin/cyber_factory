import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '@/common/pagination/page.dto';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { CyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/cyber-physical-systems.repository';

@Injectable()
export class PostgresCyberPhysicalSystemsRepository extends CyberPhysicalSystemsRepository {
  constructor(
    @InjectRepository(CyberPhysicalSystemEntity)
    private readonly repository: Repository<CyberPhysicalSystemEntity>,
  ) {
    super();
  }

  public async save(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity> {
    return this.repository.save(cyberPhysicalSystem);
  }

  public async findAll(): Promise<CyberPhysicalSystemEntity[]> {
    return this.repository.find({});
  }

  public async findByName(name: string): Promise<CyberPhysicalSystemEntity> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  public async getById(id: number): Promise<CyberPhysicalSystemEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity> {
    return this.repository.save(cyberPhysicalSystem);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CyberPhysicalSystemEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('cfs');

    queryBuilder
      .orderBy('cfs.created_date', pagination.order)
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
}
