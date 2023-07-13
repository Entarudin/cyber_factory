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
import { HostResponse } from '@/hosts/controllers/host.response';
import { HostListResponse } from '@/hosts/controllers/host-list.response';
import { CreateHostDto, CreateListHostsDto } from '@/hosts/dtos';
import { HostsService } from '@/hosts/services/hosts.service';

@ApiTags('Hosts')
@Controller()
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Post('/')
  @ApiOkResponse({
    type: HostResponse,
  })
  public async create(@Body() dto: CreateHostDto): Promise<HostResponse> {
    return new HostResponse(await this.hostsService.create(dto));
  }

  @Post('/upload-list')
  public async createList(@Body() dto: CreateListHostsDto): Promise<void> {
    await this.hostsService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: HostResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HostResponse> {
    console.log(id);
    return new HostResponse(await this.hostsService.getOrFailById(id));
  }

  @Get('/')
  @ApiPaginatedResponse(HostResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<HostListResponse> {
    return new HostListResponse(await this.hostsService.getList(pagination));
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.hostsService.delete(id);
  }
}
