import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApiPaginatedResponse } from '@/common/pagination/api-pagination.response';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { DevicesService } from '@/devices/services/devices.service';

import { CreateDeviceDto } from '../dtos';
import { DeviceResponse } from './device.response';
import { DeviceListResponse } from './device-list.response';

@ApiTags('Devices')
@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/')
  @ApiOkResponse({
    type: DeviceResponse,
  })
  public async create(@Body() dto: CreateDeviceDto): Promise<DeviceResponse> {
    return new DeviceResponse(await this.devicesService.create(dto));
  }

  @Get('/:id')
  @ApiOkResponse({
    type: DeviceResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeviceResponse> {
    console.log(id);
    return new DeviceResponse(await this.devicesService.getOrFailById(id));
  }

  @Get('/')
  @ApiPaginatedResponse(DeviceResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<DeviceListResponse> {
    return new DeviceListResponse(
      await this.devicesService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.devicesService.delete(id);
  }
}
