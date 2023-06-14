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
import {
  CreateSystemServiceDto,
  CreateListSystemServicesDto,
} from '@/system-services/dtos';
import { SystemServicesService } from '@/system-services/services/system-services.service';
import { SystemServiceResponse } from '@/system-services/controllers/system-service.response';
import { SystemServicesListResponse } from '@/system-services/controllers/system-services-list.response';

@ApiTags('System Services')
@Controller()
export class SystemServicesController {
  constructor(private readonly systemServicesService: SystemServicesService) {}

  @Post('/')
  @ApiOkResponse({
    type: SystemServiceResponse,
  })
  public async create(
    @Body() dto: CreateSystemServiceDto,
  ): Promise<SystemServiceResponse> {
    return new SystemServiceResponse(
      await this.systemServicesService.create(dto),
    );
  }

  @Post('/upload-list')
  public async createList(
    @Body() dto: CreateListSystemServicesDto,
  ): Promise<void> {
    await this.systemServicesService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: SystemServiceResponse,
  })
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SystemServiceResponse> {
    console.log(id);
    return new SystemServiceResponse(
      await this.systemServicesService.getExistSystemServiceById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(SystemServiceResponse)
  public async findAll(
    @Query() pagination: PageOptionsDto,
  ): Promise<SystemServicesListResponse> {
    return new SystemServicesListResponse(
      await this.systemServicesService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.systemServicesService.delete(id);
  }
}
