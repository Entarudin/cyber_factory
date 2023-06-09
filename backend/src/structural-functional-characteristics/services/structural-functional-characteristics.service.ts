import { DevicesService } from '@/devices/services/devices.service';
import { StructuralFunctionalCharacteristicsRepository } from '@/structural-functional-characteristics/repositories/structural-functional-characteristics.repository';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';
import {
  CreateStructuralFunctionalCharacteristicDto,
  UpdateStructuralFunctionalCharacteristicDto,
} from '@/structural-functional-characteristics/dtos';
import { StructuralFunctionalCharacteristicByIdNotFoundException } from '@/structural-functional-characteristics/exceptions';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StructuralFunctionalCharacteristicsService {
  constructor(
    private readonly structuralFunctionalCharacteristicsRepository: StructuralFunctionalCharacteristicsRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(
    dto: CreateStructuralFunctionalCharacteristicDto,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existDevice = await this.devicesService.getExistDeviceByMacAddress(
      dto.macAddress,
    );

    const structuralFunctionalCharacteristic =
      new StructuralFunctionalCharacteristicEntity();
    structuralFunctionalCharacteristic.name = dto.name;
    structuralFunctionalCharacteristic.version = dto.version;
    structuralFunctionalCharacteristic.device = existDevice;

    return this.structuralFunctionalCharacteristicsRepository.save(
      structuralFunctionalCharacteristic,
    );
  }

  public async update(
    id: number,
    dto: UpdateStructuralFunctionalCharacteristicDto,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existStructuralFunctionalCharacteristic =
      await this.getExistStructuralFunctionalCharacteristicById(id);

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
    await this.getExistStructuralFunctionalCharacteristicById(id);
    await this.structuralFunctionalCharacteristicsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<StructuralFunctionalCharacteristicEntity>> {
    return this.structuralFunctionalCharacteristicsRepository.findBy(
      pagination,
    );
  }

  public async getExistStructuralFunctionalCharacteristicById(
    id: number,
  ): Promise<StructuralFunctionalCharacteristicEntity> {
    const existStructuralFunctionalCharacteristic = await this.findById(id);
    if (!existStructuralFunctionalCharacteristic) {
      throw new StructuralFunctionalCharacteristicByIdNotFoundException();
    }
    return existStructuralFunctionalCharacteristic;
  }
}
