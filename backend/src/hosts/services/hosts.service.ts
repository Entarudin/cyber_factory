import { Injectable } from '@nestjs/common';

import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common//utils/get-chunks-list.utils';
import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesService } from '@/devices/services/devices.service';
import { HostEntity } from '@/hosts/dao/entity/host.entity';
import {
  CreateHostDto,
  CreateListHostsDto,
  HostItemDto,
  UpdateHostDto,
} from '@/hosts/dtos';
import { HostByIdNotFoundException } from '@/hosts/exceptions';
import { HostsRepository } from '@/hosts/repositories/hosts.repository';

@Injectable()
export class HostsService {
  constructor(
    private readonly hostsRepository: HostsRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(dto: CreateHostDto): Promise<HostEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const host = this.buildHost(dto.ipAddress, dto.macAddress, existDevice);

    return this.hostsRepository.save(host);
  }

  public async createList(dto: CreateListHostsDto): Promise<void> {
    const { items, deviceMacAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      deviceMacAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const listHosts = items.map((host) =>
        this.buildHost(host.ipAddress, host.macAddress, existDevice),
      );

      await this.hostsRepository.saveList(listHosts);

      return;
    }

    const chunksHosts = getChunksList<HostItemDto>(items, MAX_SIZE_CHUNK);

    for (const chunk of chunksHosts) {
      const listSystemServices = chunk.map((hosts) =>
        this.buildHost(hosts.ipAddress, hosts.macAddress, existDevice),
      );

      await this.hostsRepository.saveList(listSystemServices);
    }

    return;
  }

  public async update(id: number, dto: UpdateHostDto): Promise<HostEntity> {
    const existHost = await this.getOrFailById(id);

    existHost.ipAddress = dto.ipAddress;
    existHost.macAddress = dto.macAddress;

    return this.hostsRepository.save(existHost);
  }

  public async findById(id: number): Promise<HostEntity> {
    return this.hostsRepository.getById(id);
  }

  public async findAll(): Promise<HostEntity[]> {
    return this.hostsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.hostsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<HostEntity>> {
    return this.hostsRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<HostEntity> {
    const existHost = await this.findById(id);
    if (!existHost) {
      throw new HostByIdNotFoundException();
    }
    return existHost;
  }

  private buildHost(
    ipAddress: string,
    macAddress: string,
    device: DeviceEntity,
  ): HostEntity {
    const host = new HostEntity();
    host.ipAddress = ipAddress;
    host.macAddress = macAddress;
    host.device = device;
    return host;
  }
}
