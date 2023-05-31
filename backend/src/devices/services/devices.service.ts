import { Injectable, NotImplementedException } from '@nestjs/common';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { DevicesRepository } from '@/devices/repositories/devices.repository';
import { CyberPhysicalSystemsService } from '@/cyber-physical-systems/services/cyber-physical-systems.service';
import { CreateDeviceDto, UpdateDeviceDto } from '@/devices/dtos';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import {
  DeviceExistException,
  DeviceByIdNotFoundException,
} from '@/devices/exceptions';

@Injectable()
export class DevicesService {
  constructor(
    private readonly devicesRepository: DevicesRepository,
    private readonly cyberPhysicalSystemsService: CyberPhysicalSystemsService,
  ) {}

  public async create(dto: CreateDeviceDto): Promise<DeviceEntity> {
    const cyberPhysicalSystem =
      await this.cyberPhysicalSystemsService.getCyberPhysicalSystemExistById(
        dto.cyberPhysicalSystemId,
      );

    const existDevice = await this.devicesRepository.findByNameOrAddresses({
      name: dto.name,
      ipAddress: dto.ipAddress,
      macAddress: dto.macAddress,
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
    const device = await this.getExistDeviceById(id);
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

  public async delete(id: number): Promise<void> {
    await this.getExistDeviceById(id);
    await this.devicesRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<DeviceEntity>> {
    return this.devicesRepository.findBy(pagination);
  }

  public async getExistDeviceById(id: number): Promise<DeviceEntity> {
    const existDevice = await this.findById(id);
    if (!existDevice) {
      throw new DeviceByIdNotFoundException();
    }
    return existDevice;
  }
}
