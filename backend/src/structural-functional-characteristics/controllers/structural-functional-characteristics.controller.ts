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
import { StructuralFunctionalCharacteristicResponse } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics.response';
import { StructuralFunctionalCharacteristicListResponse } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics-list.response';
import {
  CreateListStructuralFunctionalCharacteristicDto,
  CreateStructuralFunctionalCharacteristicDto,
} from '@/structural-functional-characteristics/dtos';
import { StructuralFunctionalCharacteristicsService } from '@/structural-functional-characteristics/services/structural-functional-characteristics.service';

@ApiTags('Structural Functional Characteristics')
@Controller()
export class StructuralFunctionalCharacteristicsController {
  constructor(
    private readonly structuralFunctionalCharacteristicsService: StructuralFunctionalCharacteristicsService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: StructuralFunctionalCharacteristicResponse,
  })
  public async create(
    @Body() dto: CreateStructuralFunctionalCharacteristicDto,
  ): Promise<StructuralFunctionalCharacteristicResponse> {
    return new StructuralFunctionalCharacteristicResponse(
      await this.structuralFunctionalCharacteristicsService.create(dto),
    );
  }

  @Post('/upload-list')
  public async createList(
    @Body() dto: CreateListStructuralFunctionalCharacteristicDto,
  ): Promise<void> {
    await this.structuralFunctionalCharacteristicsService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: StructuralFunctionalCharacteristicResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StructuralFunctionalCharacteristicResponse> {
    console.log(id);
    return new StructuralFunctionalCharacteristicResponse(
      await this.structuralFunctionalCharacteristicsService.getOrFailById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(StructuralFunctionalCharacteristicResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<StructuralFunctionalCharacteristicListResponse> {
    return new StructuralFunctionalCharacteristicListResponse(
      await this.structuralFunctionalCharacteristicsService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.structuralFunctionalCharacteristicsService.delete(id);
  }
}
