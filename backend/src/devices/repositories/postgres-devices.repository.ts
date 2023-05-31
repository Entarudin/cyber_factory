import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { PageMetaDto } from '@/common/pagination/page-meta.dto';
import { DevicesRepository } from '@/devices/repositories/devices.repository';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { NameOrAddressesOptions } from '../options';

@Injectable()
export class PostgresDevicesRepository extends DevicesRepository {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly repository: Repository<DeviceEntity>,
  ) {
    super();
  }

  public async save(device: DeviceEntity): Promise<DeviceEntity> {
    return this.repository.save(device);
  }

  public async findAll(): Promise<DeviceEntity[]> {
    return this.repository.find({});
  }

  public async findByName(name: string): Promise<DeviceEntity> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  public async findByIpAddress(ipAddress: string): Promise<DeviceEntity> {
    return this.repository.findOne({
      where: {
        ipAddress,
      },
    });
  }

  public async findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<DeviceEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('devices');

    queryBuilder
      .orderBy('devices.created_date', pagination.order)
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

  public async findByNameOrAddresses(
    options: NameOrAddressesOptions,
  ): Promise<DeviceEntity> {
    return this.repository.findOne({
      where: {
        name: options.name,
        macAddress: options.macAddress,
        ipAddress: options.ipAddress,
      },
    });
  }

  public async getById(id: number): Promise<DeviceEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(device: DeviceEntity): Promise<DeviceEntity> {
    return this.repository.save(device);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
