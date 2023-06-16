import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetworkInterfacesRepository } from '@/network-interfaces/repositories/network-interfaces.repository';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { NetworkInterfaceEntity } from '../dao/entity/network-interface.entity';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';

@Injectable()
export class PostgresNetworkInterfacesRepository extends NetworkInterfacesRepository {
  constructor(
    @InjectRepository(NetworkInterfaceEntity)
    private readonly repository: Repository<NetworkInterfaceEntity>,
  ) {
    super();
  }

  public async save(
    networkInterface: NetworkInterfaceEntity,
  ): Promise<NetworkInterfaceEntity> {
    return this.repository.save(networkInterface);
  }

  public async saveList(
    listNetworkInterfaces: NetworkInterfaceEntity[],
  ): Promise<void> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .insert()
      .into(NetworkInterfaceEntity)
      .values(listNetworkInterfaces)
      .orIgnore()
      .execute();

    return;
  }

  public async findAll(): Promise<NetworkInterfaceEntity[]> {
    return this.repository.find({});
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<NetworkInterfaceEntity>> {
    const queryBuilder =
      this.repository.createQueryBuilder('network_interfaces');

    queryBuilder
      .orderBy('network_interfaces.created_date', pagination.order)
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

  public async getById(id: number): Promise<NetworkInterfaceEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    networkInterface: NetworkInterfaceEntity,
  ): Promise<NetworkInterfaceEntity> {
    return this.repository.save(networkInterface);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
