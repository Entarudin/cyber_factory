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
import { CyberPhysicalSystemResponse } from '@/cyber-physical-systems/controllers/cyber-physical-system.response';
import { CyberPhysicalSystemListResponse } from '@/cyber-physical-systems/controllers/cyber-physical-system-list.response';
import { CreateCyberPhysicalSystemDto } from '@/cyber-physical-systems/dtos';
import { CyberPhysicalSystemsService } from '@/cyber-physical-systems/services/cyber-physical-systems.service';

@ApiTags('Cyber Physical Systems')
@Controller()
export class CyberPhysicalSystemsController {
  constructor(
    private readonly cyberPhysicalSystemsService: CyberPhysicalSystemsService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: CyberPhysicalSystemResponse,
  })
  public async create(
    @Body() dto: CreateCyberPhysicalSystemDto,
  ): Promise<CyberPhysicalSystemResponse> {
    return new CyberPhysicalSystemResponse(
      await this.cyberPhysicalSystemsService.create(dto),
    );
  }

  @Get('/:id')
  @ApiOkResponse({
    type: CyberPhysicalSystemResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CyberPhysicalSystemResponse> {
    console.log(id);
    return new CyberPhysicalSystemResponse(
      await this.cyberPhysicalSystemsService.getOrFailById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(CyberPhysicalSystemResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<CyberPhysicalSystemListResponse> {
    return new CyberPhysicalSystemListResponse(
      await this.cyberPhysicalSystemsService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cyberPhysicalSystemsService.delete(id);
  }
}
