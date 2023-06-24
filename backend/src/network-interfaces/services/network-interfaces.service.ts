import { Injectable } from '@nestjs/common';

import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common//utils/get-chunks-list.utils';
import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesService } from '@/devices/services/devices.service';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';
import {
  CreateListNetworkInterfacesDto,
  CreateNetworkInterfaceDto,
  NetworkInterfaceItemDto,
  UpdateNetworkInterfaceDto,
} from '@/network-interfaces/dtos';
import { NetworkInterfaceByIdNotFoundException } from '@/network-interfaces/exceptions';
import { NetworkInterfacesRepository } from '@/network-interfaces/repositories/network-interfaces.repository';

@Injectable()
export class NetworkInterfacesService {
  constructor(
    private readonly networkInterfacesRepository: NetworkInterfacesRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(
    dto: CreateNetworkInterfaceDto,
  ): Promise<NetworkInterfaceEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const application = this.buildNetworkInterface(
      dto.name,
      dto.ipAddress,
      existDevice,
    );

    return this.networkInterfacesRepository.save(application);
  }

  public async createList(dto: CreateListNetworkInterfacesDto): Promise<void> {
    const { items, deviceMacAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      deviceMacAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const listNetworkInterfaces = items.map((networkInterface) =>
        this.buildNetworkInterface(
          networkInterface.name,
          networkInterface.ipAddress,
          existDevice,
        ),
      );

      await this.networkInterfacesRepository.saveList(listNetworkInterfaces);

      return;
    }

    const chunksNetworkInterfaces = getChunksList<NetworkInterfaceItemDto>(
      items,
      MAX_SIZE_CHUNK,
    );

    for (const chunk of chunksNetworkInterfaces) {
      const listNetworkInterfaces = chunk.map((networkInterface) =>
        this.buildNetworkInterface(
          networkInterface.name,
          networkInterface.ipAddress,
          existDevice,
        ),
      );

      await this.networkInterfacesRepository.saveList(listNetworkInterfaces);
    }

    return;
  }

  public async update(
    id: number,
    dto: UpdateNetworkInterfaceDto,
  ): Promise<NetworkInterfaceEntity> {
    const existNetworkInterface = await this.getOrFailById(id);

    existNetworkInterface.name = dto.name;
    existNetworkInterface.ipAddress = dto.ipAddress;

    return this.networkInterfacesRepository.save(existNetworkInterface);
  }

  public async findById(id: number): Promise<NetworkInterfaceEntity> {
    return this.networkInterfacesRepository.getById(id);
  }

  public async findAll(): Promise<NetworkInterfaceEntity[]> {
    return this.networkInterfacesRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.networkInterfacesRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<NetworkInterfaceEntity>> {
    return this.networkInterfacesRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<NetworkInterfaceEntity> {
    const existNetworkInterface = await this.findById(id);
    if (!existNetworkInterface) {
      throw new NetworkInterfaceByIdNotFoundException();
    }
    return existNetworkInterface;
  }

  private buildNetworkInterface(
    name: string,
    ipAddress: string,
    device: DeviceEntity,
  ): NetworkInterfaceEntity {
    const networkInterface = new NetworkInterfaceEntity();
    networkInterface.name = name;
    networkInterface.ipAddress = ipAddress;
    networkInterface.device = device;
    return networkInterface;
  }
}
