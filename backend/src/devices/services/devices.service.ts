import { Injectable } from '@nestjs/common';

import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CyberPhysicalSystemsService } from '@/cyber-physical-systems/services/cyber-physical-systems.service';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from '@/devices/dtos';
import {
  DeviceByIdNotFoundException,
  DeviceByMacAddressNotFoundException,
  DeviceExistException,
  DeviceWithMacAddressExistException,
} from '@/devices/exceptions';
import { DevicesRepository } from '@/devices/repositories/devices.repository';

@Injectable()
export class DevicesService {
  constructor(
    private readonly devicesRepository: DevicesRepository,
    private readonly cyberPhysicalSystemsService: CyberPhysicalSystemsService,
  ) {}

  public async create(dto: CreateDeviceDto): Promise<DeviceEntity> {
    await this.checkExistByMacAddress(dto.macAddress);

    const cyberPhysicalSystem =
      await this.cyberPhysicalSystemsService.getOrFailById(
        dto.cyberPhysicalSystemId,
      );

    const existDevice = await this.devicesRepository.findByNameOrAddresses({
      name: dto.name,
      ipAddress: dto.ipAddress,
      cyberPhysicalSystemId: dto.cyberPhysicalSystemId,
    });

    if (existDevice) {
      throw new DeviceExistException();
    }

    const device = new DeviceEntity();
    device.ipAddress = dto.ipAddress;
    device.macAddress = dto.macAddress;
    device.name = dto.name;
    device.networkInterface = dto.networkInterface;
    device.cyberPhysicalSystem = cyberPhysicalSystem;

    return this.devicesRepository.save(device);
  }

  public async getByName(name: string): Promise<DeviceEntity | null> {
    return this.devicesRepository.findByName(name);
  }

  public async update(id: number, dto: UpdateDeviceDto): Promise<DeviceEntity> {
    const device = await this.getOrFailById(id);
    device.ipAddress = dto.ipAddress;
    device.macAddress = dto.macAddress;
    device.name = dto.name;
    device.networkInterface = dto.networkInterface;

    return this.devicesRepository.save(device);
  }

  public async findById(id: number): Promise<DeviceEntity> {
    return this.devicesRepository.getById(id);
  }

  public async findAll(): Promise<DeviceEntity[]> {
    return this.devicesRepository.findAll();
  }

  public async findByMacAddress(macAddress: string): Promise<DeviceEntity> {
    return this.devicesRepository.findByMacAddress(macAddress);
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.devicesRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<DeviceEntity>> {
    return this.devicesRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<DeviceEntity> {
    const existDevice = await this.findById(id);
    if (!existDevice) {
      throw new DeviceByIdNotFoundException();
    }
    return existDevice;
  }

  public async getOrFailByMacAddress(
    macAddress: string,
  ): Promise<DeviceEntity> {
    const existDevice = await this.findByMacAddress(macAddress);
    if (!existDevice) {
      throw new DeviceByMacAddressNotFoundException();
    }
    return existDevice;
  }

  private async checkExistByMacAddress(macAddress: string): Promise<void> {
    const existDevice = await this.devicesRepository.findByMacAddress(
      macAddress,
    );
    if (existDevice) {
      throw new DeviceWithMacAddressExistException();
    }
  }
}
