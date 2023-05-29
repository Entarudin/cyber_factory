import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { ApiPaginatedResponse } from '@/common/pagination/api-pagination.response';
import { DevicesService } from '@/devices/services/devices.service';
import { DeviceResponse } from './device.response';
import { CreateDeviceDto } from '../dtos';
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
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeviceResponse> {
    console.log(id);
    return new DeviceResponse(await this.devicesService.getExistDeviceById(id));
  }

  @Get('/')
  @ApiPaginatedResponse(DeviceResponse)
  public async findAll(
    @Query() pagination: PageOptionsDto,
  ): Promise<DeviceListResponse> {
    return new DeviceListResponse(
      await this.devicesService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delele(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.devicesService.delete(id);
  }
}
