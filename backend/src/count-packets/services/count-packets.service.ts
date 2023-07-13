import { Injectable } from '@nestjs/common';

import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';
import {
  CreateCountPacketsDto,
  UpdateCountPacketsDto,
} from '@/count-packets/dtos';
import { CountPacketsByIdNotFoundException } from '@/count-packets/exceptions/count-packets-by-id-not-found';
import { CountPacketsRepository } from '@/count-packets/repositories/count-packets.repository';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import { DevicesService } from '@/devices/services/devices.service';

@Injectable()
export class MonitorResourcesService {
  constructor(
    private readonly countPacketsRepository: CountPacketsRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(dto: CreateCountPacketsDto): Promise<CountPacketsEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const countPackets = this.buildCountPackets(
      dto.timing,
      dto.allProtoCount,
      dto.tcpCount,
      dto.udpCount,
      dto.httpRequestCount,
      dto.httpResponseCount,
      dto.arpCount,
      dto.icmpCount,
      dto.modbus01RequestCount,
      dto.modbus02RequestCount,
      dto.modbus03RequestCount,
      dto.modbus04RequestCount,
      dto.modbus05RequestCount,
      dto.modbus06RequestCount,
      dto.modbus15RequestCount,
      dto.modbus16RequestCount,
      dto.modbus01ResponseCount,
      dto.modbus02ResponseCount,
      dto.modbus03ResponseCount,
      dto.modbus04ResponseCount,
      dto.modbus05ResponseCount,
      dto.modbus06ResponseCount,
      dto.modbus15ResponseCount,
      dto.modbus16ResponseCount,
      existDevice,
    );

    return this.countPacketsRepository.save(countPackets);
  }

  public async update(
    id: number,
    dto: UpdateCountPacketsDto,
  ): Promise<CountPacketsEntity> {
    const existCountPackets = await this.getOrFailById(id);

    existCountPackets.timing = dto.timing;
    existCountPackets.allProtoCount = dto.allProtoCount;
    existCountPackets.tcpCount = dto.tcpCount;
    existCountPackets.udpCount = dto.udpCount;
    existCountPackets.httpRequestCount = dto.httpRequestCount;
    existCountPackets.httpResponseCount = dto.httpResponseCount;
    existCountPackets.arpCount = dto.arpCount;
    existCountPackets.icmpCount = dto.icmpCount;
    existCountPackets.modbus01RequestCount = dto.modbus01RequestCount;
    existCountPackets.modbus02RequestCount = dto.modbus02RequestCount;
    existCountPackets.modbus03RequestCount = dto.modbus03RequestCount;
    existCountPackets.modbus04RequestCount = dto.modbus04RequestCount;
    existCountPackets.modbus05RequestCount = dto.modbus05RequestCount;
    existCountPackets.modbus06RequestCount = dto.modbus06RequestCount;
    existCountPackets.modbus15RequestCount = dto.modbus15RequestCount;
    existCountPackets.modbus16RequestCount = dto.modbus16RequestCount;
    existCountPackets.modbus01ResponseCount = dto.modbus01ResponseCount;
    existCountPackets.modbus02ResponseCount = dto.modbus02ResponseCount;
    existCountPackets.modbus03ResponseCount = dto.modbus03ResponseCount;
    existCountPackets.modbus04ResponseCount = dto.modbus04ResponseCount;
    existCountPackets.modbus05ResponseCount = dto.modbus05ResponseCount;
    existCountPackets.modbus06ResponseCount = dto.modbus06ResponseCount;
    existCountPackets.modbus15ResponseCount = dto.modbus15ResponseCount;
    existCountPackets.modbus16ResponseCount = dto.modbus16ResponseCount;

    return this.countPacketsRepository.save(existCountPackets);
  }

  public async findById(id: number): Promise<CountPacketsEntity> {
    return this.countPacketsRepository.getById(id);
  }

  public async findAll(): Promise<CountPacketsEntity[]> {
    return this.countPacketsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.countPacketsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CountPacketsEntity>> {
    return this.countPacketsRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<CountPacketsEntity> {
    const existCountPackets = await this.findById(id);
    if (!existCountPackets) {
      throw new CountPacketsByIdNotFoundException();
    }
    return existCountPackets;
  }

  private buildCountPackets(
    timing: number,
    allProtoCount: number,
    tcpCount: number,
    udpCount: number,
    httpRequestCount: number,
    httpResponseCount: number,
    arpCount: number,
    icmpCount: number,
    modbus01RequestCount: number,
    modbus02RequestCount: number,
    modbus03RequestCount: number,
    modbus04RequestCount: number,
    modbus05RequestCount: number,
    modbus06RequestCount: number,
    modbus15RequestCount: number,
    modbus16RequestCount: number,
    modbus01ResponseCount: number,
    modbus02ResponseCount: number,
    modbus03ResponseCount: number,
    modbus04ResponseCount: number,
    modbus05ResponseCount: number,
    modbus06ResponseCount: number,
    modbus15ResponseCount: number,
    modbus16ResponseCount: number,
    device: DeviceEntity,
  ): CountPacketsEntity {
    const countPackets = new CountPacketsEntity();
    countPackets.timing = timing;
    countPackets.allProtoCount = allProtoCount;
    countPackets.tcpCount = tcpCount;
    countPackets.udpCount = udpCount;
    countPackets.httpRequestCount = httpRequestCount;
    countPackets.httpResponseCount = httpResponseCount;
    countPackets.arpCount = arpCount;
    countPackets.icmpCount = icmpCount;
    countPackets.modbus01RequestCount = modbus01RequestCount;
    countPackets.modbus02RequestCount = modbus02RequestCount;
    countPackets.modbus03RequestCount = modbus03RequestCount;
    countPackets.modbus04RequestCount = modbus04RequestCount;
    countPackets.modbus05RequestCount = modbus05RequestCount;
    countPackets.modbus06RequestCount = modbus06RequestCount;
    countPackets.modbus15RequestCount = modbus15RequestCount;
    countPackets.modbus16RequestCount = modbus16RequestCount;
    countPackets.modbus01ResponseCount = modbus01ResponseCount;
    countPackets.modbus02ResponseCount = modbus02ResponseCount;
    countPackets.modbus03ResponseCount = modbus03ResponseCount;
    countPackets.modbus04ResponseCount = modbus04ResponseCount;
    countPackets.modbus05ResponseCount = modbus05ResponseCount;
    countPackets.modbus06ResponseCount = modbus06ResponseCount;
    countPackets.modbus15ResponseCount = modbus15ResponseCount;
    countPackets.modbus16ResponseCount = modbus16ResponseCount;
    countPackets.device = device;
    return countPackets;
  }
}
