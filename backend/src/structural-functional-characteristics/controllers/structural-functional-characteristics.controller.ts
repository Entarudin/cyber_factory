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
import { StructuralFunctionalCharacteristicsService } from '@/structural-functional-characteristics/services/structural-functional-characteristics.service';
import { StructuralFunctionalCharacteristicResponse } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics.response';
import { StructuralFunctionalCharacteristicListResponse } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics-list.response';
import { CreateStructuralFunctionalCharacteristicDto } from '@/structural-functional-characteristics/dtos';

@ApiTags('Structural Functional Characteristics')
@Controller()
export class DevicesController {
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

  @Get('/:id')
  @ApiOkResponse({
    type: StructuralFunctionalCharacteristicResponse,
  })
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StructuralFunctionalCharacteristicResponse> {
    console.log(id);
    return new StructuralFunctionalCharacteristicResponse(
      await this.structuralFunctionalCharacteristicsService.getExistStructuralFunctionalCharacteristicById(
        id,
      ),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(StructuralFunctionalCharacteristicResponse)
  public async findAll(
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
