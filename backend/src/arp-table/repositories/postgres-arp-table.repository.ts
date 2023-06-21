import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { ArpTableRepository } from '@/arp-table/repositories/arp-table.repository';
import {
  ArpTable,
  ArpTableItemEntity,
} from '@/arp-table/dao/entity/arp-table.entity';

@Injectable()
export class PostgresArpTableRepository extends ArpTableRepository {
  constructor(
    @InjectRepository(ArpTableItemEntity)
    private readonly repository: Repository<ArpTableItemEntity>,
  ) {
    super();
  }

  public async save(
    arpTableItem: ArpTableItemEntity,
  ): Promise<ArpTableItemEntity> {
    return this.repository.save(arpTableItem);
  }

  public async saveList(arpTable: ArpTable): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(ArpTableItemEntity)
      .values(arpTable)
      .orIgnore()
      .execute();

    return;
  }

  public async findAll(): Promise<ArpTable> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ArpTableItemEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('arp_table');

    queryBuilder
      .orderBy('arp_table.created_date', pagination.order)
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

  public async getById(id: number): Promise<ArpTableItemEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    arpTableItem: ArpTableItemEntity,
  ): Promise<ArpTableItemEntity> {
    return this.repository.save(arpTableItem);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
