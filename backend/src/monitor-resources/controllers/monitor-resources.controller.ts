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
import { CreateMonitorResourceDto } from '@/monitor-resources/dtos';
import { MonitorResourcesService } from '@/monitor-resources/services/monitor-resources.service';
import { MonitorResourceResponse } from '@/monitor-resources/controllers/monitor-resource.response';
import { MonitorResourcesListResponse } from '@/monitor-resources/controllers/monitor-resources-list.response';

@ApiTags('Monitor Resources')
@Controller()
export class MonitorResourcesController {
  constructor(
    private readonly monitorResourcesService: MonitorResourcesService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: MonitorResourceResponse,
  })
  public async create(
    @Body() dto: CreateMonitorResourceDto,
  ): Promise<MonitorResourceResponse> {
    return new MonitorResourceResponse(
      await this.monitorResourcesService.create(dto),
    );
  }

  @Get('/:id')
  @ApiOkResponse({
    type: MonitorResourceResponse,
  })
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MonitorResourceResponse> {
    console.log(id);
    return new MonitorResourceResponse(
      await this.monitorResourcesService.getExistMonitorResourceById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(MonitorResourceResponse)
  public async findAll(
    @Query() pagination: PageOptionsDto,
  ): Promise<MonitorResourcesListResponse> {
    return new MonitorResourcesListResponse(
      await this.monitorResourcesService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.monitorResourcesService.delete(id);
  }
}
