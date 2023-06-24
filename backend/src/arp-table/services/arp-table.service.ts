import { Injectable } from '@nestjs/common';
import { DevicesService } from '@/devices/services/devices.service';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import {
  getChunksList,
  MAX_SIZE_CHUNK,
} from '@/common/utils/get-chunks-list.utils';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';
import {
  ArpTable,
  ArpTableItemEntity,
} from '@/arp-table/dao/entity/arp-table.entity';
import { ArpTableRepository } from '@/arp-table/repositories/arp-table.repository';
import {
  ArpTableItemDto,
  CreateArpTableItemDto,
  UpdateArpTableItemDto,
  CreateArpTableDto,
} from '@/arp-table/dtos';
import { ArpTableItemByIdNotFoundException } from '@/arp-table/exceptions/arp-table-item-by-id-not-found.exception';

@Injectable()
export class ArpTableService {
  constructor(
    private readonly arpTableRepository: ArpTableRepository,
    private readonly devicesService: DevicesService,
  ) {}

  public async create(dto: CreateArpTableItemDto): Promise<ArpTableItemEntity> {
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      dto.deviceMacAddress,
    );

    const arpTableItem = this.buildArpTableItem(
      dto.ipAddress,
      dto.macAddress,
      existDevice,
    );

    return this.arpTableRepository.save(arpTableItem);
  }

  public async createList(dto: CreateArpTableDto): Promise<void> {
    const { items, deviceMacAddress } = dto;
    const existDevice = await this.devicesService.getOrFailByMacAddress(
      deviceMacAddress,
    );

    if (items.length <= MAX_SIZE_CHUNK) {
      const arpTable = items.map((arpTableItem) =>
        this.buildArpTableItem(
          arpTableItem.ipAddress,
          arpTableItem.macAddress,
          existDevice,
        ),
      );

      await this.arpTableRepository.saveList(arpTable);

      return;
    }

    const chunksArpTable = getChunksList<ArpTableItemDto>(
      items,
      MAX_SIZE_CHUNK,
    );

    for (const chunk of chunksArpTable) {
      const listApplications = chunk.map((arpTableItem) =>
        this.buildArpTableItem(
          arpTableItem.ipAddress,
          arpTableItem.macAddress,
          existDevice,
        ),
      );

      await this.arpTableRepository.saveList(listApplications);
    }

    return;
  }

  public async update(
    id: number,
    dto: UpdateArpTableItemDto,
  ): Promise<ArpTableItemEntity> {
    const existArpTable = await this.getOrFailById(id);

    existArpTable.ipAddress = dto.ipAddress;
    existArpTable.macAddress = dto.macAddress;

    return this.arpTableRepository.save(existArpTable);
  }

  public async findById(id: number): Promise<ArpTableItemEntity> {
    return this.arpTableRepository.getById(id);
  }

  public async findAll(): Promise<ArpTable> {
    return this.arpTableRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.arpTableRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ArpTableItemEntity>> {
    return this.arpTableRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<ArpTableItemEntity> {
    const existArpTableItem = await this.findById(id);
    if (!existArpTableItem) {
      throw new ArpTableItemByIdNotFoundException();
    }
    return existArpTableItem;
  }

  private buildArpTableItem(
    ipAddress: string,
    macAddress: string,
    device: DeviceEntity,
  ): ArpTableItemEntity {
    const arpTableItem = new ArpTableItemEntity();
    arpTableItem.ipAddress = ipAddress;
    arpTableItem.macAddress = macAddress;
    arpTableItem.device = device;
    return arpTableItem;
  }
}
