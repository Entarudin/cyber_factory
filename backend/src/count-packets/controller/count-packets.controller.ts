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
import { CountPacketsResponse } from '@/count-packets/controller/count-packets.response';
import { CountPacketsListResponse } from '@/count-packets/controller/count-packets-list.response';
import { CreateCountPacketsDto } from '@/count-packets/dtos';
import { CountPacketsService } from '@/count-packets/services/count-packets.service';

@ApiTags('Count Packets')
@Controller()
export class CountPacketsController {
  constructor(private readonly countPacketsService: CountPacketsService) {}

  @Post('/')
  @ApiOkResponse({
    type: CountPacketsResponse,
  })
  public async create(
    @Body() dto: CreateCountPacketsDto,
  ): Promise<CountPacketsResponse> {
    return new CountPacketsResponse(await this.countPacketsService.create(dto));
  }

  @Get('/:id')
  @ApiOkResponse({
    type: CountPacketsResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CountPacketsResponse> {
    console.log(id);
    return new CountPacketsResponse(
      await this.countPacketsService.getOrFailById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(CountPacketsResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<CountPacketsListResponse> {
    return new CountPacketsListResponse(
      await this.countPacketsService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.countPacketsService.delete(id);
  }
}
