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

import { ApplicationResponse } from '@/applications/controllers/application.response';
import { ApplicationsListResponse } from '@/applications/controllers/applications-list.response';
import {
  CreateApplicationDto,
  CreateListApplicationsDto,
} from '@/applications/dtos';
import { ApplicationsService } from '@/applications/services/applications.service';
import { ApiPaginatedResponse } from '@/common/pagination/api-pagination.response';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';

@ApiTags('Applications')
@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('/')
  @ApiOkResponse({
    type: ApplicationResponse,
  })
  public async create(
    @Body() dto: CreateApplicationDto,
  ): Promise<ApplicationResponse> {
    return new ApplicationResponse(await this.applicationsService.create(dto));
  }

  @Post('/upload-list')
  public async createList(
    @Body() dto: CreateListApplicationsDto,
  ): Promise<void> {
    await this.applicationsService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: ApplicationResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApplicationResponse> {
    console.log(id);
    return new ApplicationResponse(
      await this.applicationsService.getOrFailById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(ApplicationResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<ApplicationsListResponse> {
    return new ApplicationsListResponse(
      await this.applicationsService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.applicationsService.delete(id);
  }
}
