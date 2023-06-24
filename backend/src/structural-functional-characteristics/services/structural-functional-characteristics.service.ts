import { Injectable } from '@nestjs/common';
import { DevicesService } from '@/devices/services/devices.service';
import { StructuralFunctionalCharacteristicsRepository } from '@/structural-functional-characteristics/repositories/structural-functional-characteristics.repository';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';
import {
  CreateStructuralFunctionalCharacteristicDto,
  UpdateStructuralFunctionalCharacteristicDto,
  CreateListStructuralFunctionalCharacteristicDto,
  StructuralFunctionalCharacteristicItemDto,
} from '@/structural-functional-characteristics/dtos';
import { StructuralFunctionalCharacteristicByIdNotFoundException } from '@/structural-functional-characteristics/exceptions';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common//utils/get-chunks-list.utils';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';

@Injectable()
export class StructuralFunctionalCharacteristicsService {
  constructor(
    private readonly structuralFunctionalCharacteristicsRepository: StructuralFunctionalCharacteristicsRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(
    dto: CreateStructuralFunctionalCharacteristicDto,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.macAddress,
    );

    const structuralFunctionalCharacteristic =
      this.buildStructuralFunctionalCharacteristic(
        dto.name,
        dto.version,
        existDevice,
      );

    return this.structuralFunctionalCharacteristicsRepository.save(
      structuralFunctionalCharacteristic,
    );
  }

  public async createList(
    dto: CreateListStructuralFunctionalCharacteristicDto,
  ): Promise<void> {
    const { items, macAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      macAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const listStructuralFunctionalCharacteristics = items.map((sfc) =>
        this.buildStructuralFunctionalCharacteristic(
          sfc.name,
          sfc.version,
          existDevice,
        ),
      );
      await this.structuralFunctionalCharacteristicsRepository.saveList(
        listStructuralFunctionalCharacteristics,
      );

      return;
    }

    const chunksStructuralFunctionalCharacteristics =
      getChunksList<StructuralFunctionalCharacteristicItemDto>(
        items,
        MAX_SIZE_CHUNK,
      );

    for (const chunk of chunksStructuralFunctionalCharacteristics) {
      const listStructuralFunctionalCharacteristics = chunk.map((sfc) =>
        this.buildStructuralFunctionalCharacteristic(
          sfc.name,
          sfc.version,
          existDevice,
        ),
      );
      await this.structuralFunctionalCharacteristicsRepository.saveList(
        listStructuralFunctionalCharacteristics,
      );
    }
    return;
  }

  public async update(
    id: number,
    dto: UpdateStructuralFunctionalCharacteristicDto,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existStructuralFunctionalCharacteristic = await this.getOrFailById(
      id,
    );

    existStructuralFunctionalCharacteristic.name = dto.name;
    existStructuralFunctionalCharacteristic.version = dto.version;

    return this.structuralFunctionalCharacteristicsRepository.save(
      existStructuralFunctionalCharacteristic,
    );
  }

  public async findById(
    id: number,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    return this.structuralFunctionalCharacteristicsRepository.getById(id);
  }

  public async findAll(): Promise<StructuralFunctionalCharacteristicEntity[]> {
    return this.structuralFunctionalCharacteristicsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.structuralFunctionalCharacteristicsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<StructuralFunctionalCharacteristicEntity>> {
    return this.structuralFunctionalCharacteristicsRepository.findBy(
      pagination,
    );
  }

  public async getOrFailById(
    id: number,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existStructuralFunctionalCharacteristic = await this.findById(id);
    if (!existStructuralFunctionalCharacteristic) {
      throw new StructuralFunctionalCharacteristicByIdNotFoundException();
    }
    return existStructuralFunctionalCharacteristic;
  }

  private buildStructuralFunctionalCharacteristic(
    name: string,
    version: string,
    device: DeviceEntity,
  ): StructuralFunctionalCharacteristicEntity {
    const structuralFunctionalCharacteristic =
      new StructuralFunctionalCharacteristicEntity();
    structuralFunctionalCharacteristic.name = name;
    structuralFunctionalCharacteristic.version = version;
    structuralFunctionalCharacteristic.device = device;
    return structuralFunctionalCharacteristic;
  }
}
