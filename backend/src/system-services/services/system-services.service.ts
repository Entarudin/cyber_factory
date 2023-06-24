import { Injectable } from '@nestjs/common';
import { DevicesService } from '@/devices/services/devices.service';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common//utils/get-chunks-list.utils';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { SystemServicesRepository } from '@/system-services/repositories/system-services.repository';
import {
  CreateListSystemServicesDto,
  CreateSystemServiceDto,
  UpdateSystemServiceDto,
  SystemServiceItemDto,
} from '@/system-services/dtos';
import { SystemServiceEntity } from '../dao/entity/system-service.entity';
import { SystemServiceByIdNotFoundException } from '@/system-services/exceptions';

@Injectable()
export class SystemServicesService {
  constructor(
    private readonly systemServicesRepository: SystemServicesRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(
    dto: CreateSystemServiceDto,
  ): Promise<SystemServiceEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const systemService = this.buildSystemService(
      dto.name,
      dto.status,
      existDevice,
    );

    return this.systemServicesRepository.save(systemService);
  }

  public async createList(dto: CreateListSystemServicesDto): Promise<void> {
    const { items, deviceMacAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      deviceMacAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const listSystemServices = items.map((systemService) =>
        this.buildSystemService(
          systemService.name,
          systemService.status,
          existDevice,
        ),
      );

      await this.systemServicesRepository.saveList(listSystemServices);

      return;
    }

    const chunksSystemServices = getChunksList<SystemServiceItemDto>(
      items,
      MAX_SIZE_CHUNK,
    );

    for (const chunk of chunksSystemServices) {
      const listSystemServices = chunk.map((systemService) =>
        this.buildSystemService(
          systemService.name,
          systemService.status,
          existDevice,
        ),
      );

      await this.systemServicesRepository.saveList(listSystemServices);
    }

    return;
  }

  public async update(
    id: number,
    dto: UpdateSystemServiceDto,
  ): Promise<SystemServiceEntity> {
    const existSystemService = await this.getOrFailById(id);

    existSystemService.name = dto.name;
    existSystemService.status = dto.status;

    return this.systemServicesRepository.save(existSystemService);
  }

  public async findById(id: number): Promise<SystemServiceEntity> {
    return this.systemServicesRepository.getById(id);
  }

  public async findAll(): Promise<SystemServiceEntity[]> {
    return this.systemServicesRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.systemServicesRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<SystemServiceEntity>> {
    return this.systemServicesRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<SystemServiceEntity> {
    const existSystemService = await this.findById(id);
    if (!existSystemService) {
      throw new SystemServiceByIdNotFoundException();
    }
    return existSystemService;
  }

  private buildSystemService(
    name: string,
    status: string,
    device: DeviceEntity,
  ): SystemServiceEntity {
    const systemService = new SystemServiceEntity();
    systemService.name = name;
    systemService.status = status;
    systemService.device = device;
    return systemService;
  }
}
