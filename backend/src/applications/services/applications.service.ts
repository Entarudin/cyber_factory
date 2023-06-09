import { Injectable } from '@nestjs/common';

import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import {
  ApplicationItemDto,
  CreateApplicationDto,
  CreateListApplicationsDto,
  UpdateApplicationDto,
} from '@/applications/dtos';
import { ApplicationByIdNotFoundException } from '@/applications/exceptions';
import { ApplicationsRepository } from '@/applications/repositories/applications.repository';
import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common/utils/get-chunks-list.utils';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesService } from '@/devices/services/devices.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(dto: CreateApplicationDto): Promise<ApplicationEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const application = this.buildApplication(
      dto.name,
      dto.version,
      dto.description,
      existDevice,
    );

    return this.applicationsRepository.save(application);
  }

  public async createList(dto: CreateListApplicationsDto): Promise<void> {
    const { items, deviceMacAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      deviceMacAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const listApplications = items.map((application) =>
        this.buildApplication(
          application.name,
          application.version,
          application.description,
          existDevice,
        ),
      );

      await this.applicationsRepository.saveList(listApplications);

      return;
    }

    const chunksApplications = getChunksList<ApplicationItemDto>(
      items,
      MAX_SIZE_CHUNK,
    );

    for (const chunk of chunksApplications) {
      const listApplications = chunk.map((application) =>
        this.buildApplication(
          application.name,
          application.version,
          application.description,
          existDevice,
        ),
      );

      await this.applicationsRepository.saveList(listApplications);
    }

    return;
  }

  public async update(
    id: number,
    dto: UpdateApplicationDto,
  ): Promise<ApplicationEntity> {
    const existApplication = await this.getOrFailById(id);

    existApplication.name = dto.name;
    existApplication.version = dto.version;
    existApplication.description = dto.description;

    return this.applicationsRepository.save(existApplication);
  }

  public async findById(id: number): Promise<ApplicationEntity> {
    return this.applicationsRepository.getById(id);
  }

  public async findAll(): Promise<ApplicationEntity[]> {
    return this.applicationsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.applicationsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ApplicationEntity>> {
    return this.applicationsRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<ApplicationEntity> {
    const existApplication = await this.findById(id);
    if (!existApplication) {
      throw new ApplicationByIdNotFoundException();
    }
    return existApplication;
  }

  private buildApplication(
    name: string,
    version: string,
    description: string,
    device: DeviceEntity,
  ): ApplicationEntity {
    const application = new ApplicationEntity();
    application.name = name;
    application.version = version;
    application.description = description;
    application.device = device;
    return application;
  }
}
