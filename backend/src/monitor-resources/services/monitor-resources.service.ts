import { Injectable } from '@nestjs/common';

import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesService } from '@/devices/services/devices.service';
import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';
import {
  CreateMonitorResourceDto,
  UpdateMonitorResourceDto,
} from '@/monitor-resources/dtos';
import { MonitorResourceByIdNotFoundException } from '@/monitor-resources/exceptions';
import { MonitorResourcesRepository } from '@/monitor-resources/repositories/monitor-resources.repository';

@Injectable()
export class MonitorResourcesService {
  constructor(
    private readonly monitorResourcesRepository: MonitorResourcesRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(
    dto: CreateMonitorResourceDto,
  ): Promise<MonitorResourceEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const monitorResource = this.buildMonitorResource(
      dto.cpuLoad,
      dto.ramLoad,
      dto.cpuTemperature,
      dto.countTransmittedUdpPackets,
      dto.countTransmittedTcpPackets,
      dto.countTransmittedArpPackets,
      dto.diskLoad,
      existDevice,
    );

    return this.monitorResourcesRepository.save(monitorResource);
  }

  public async update(
    id: number,
    dto: UpdateMonitorResourceDto,
  ): Promise<MonitorResourceEntity> {
    const existMonitorResource = await this.getOrFailById(id);

    existMonitorResource.cpuLoad = dto.cpuLoad;
    existMonitorResource.ramLoad = dto.ramLoad;
    existMonitorResource.cpuTemperature = dto.cpuTemperature;
    existMonitorResource.countTransmittedUdpPackets =
      dto.countTransmittedUdpPackets;
    existMonitorResource.countTransmittedTcpPackets =
      dto.countTransmittedTcpPackets;
    existMonitorResource.countTransmittedArpPackets =
      dto.countTransmittedArpPackets;
    existMonitorResource.diskLoad = dto.diskLoad;

    return this.monitorResourcesRepository.save(existMonitorResource);
  }

  public async findById(id: number): Promise<MonitorResourceEntity> {
    return this.monitorResourcesRepository.getById(id);
  }

  public async findAll(): Promise<MonitorResourceEntity[]> {
    return this.monitorResourcesRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.monitorResourcesRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<MonitorResourceEntity>> {
    return this.monitorResourcesRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<MonitorResourceEntity> {
    const existMonitorResource = await this.findById(id);
    if (!existMonitorResource) {
      throw new MonitorResourceByIdNotFoundException();
    }
    return existMonitorResource;
  }

  private buildMonitorResource(
    cpuLoad: number,
    ramLoad: number,
    cpuTemperature: number,
    countTransmittedUdpPackets: number,
    countTransmittedTcpPackets: number,
    countTransmittedArpPackets: number,
    diskLoad: number,
    device: DeviceEntity,
  ): MonitorResourceEntity {
    const monitorResource = new MonitorResourceEntity();
    monitorResource.cpuLoad = cpuLoad;
    monitorResource.ramLoad = ramLoad;
    monitorResource.cpuTemperature = cpuTemperature;
    monitorResource.countTransmittedUdpPackets = countTransmittedUdpPackets;
    monitorResource.countTransmittedTcpPackets = countTransmittedTcpPackets;
    monitorResource.countTransmittedArpPackets = countTransmittedArpPackets;
    monitorResource.diskLoad = diskLoad;
    monitorResource.device = device;
    return monitorResource;
  }
}
