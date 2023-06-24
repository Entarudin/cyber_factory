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
import { ArpTableItemResponse } from '@/arp-table/controllers/arp-table-item.response';
import { ArpTableResponse } from '@/arp-table/controllers/arp-table.response';
import { ArpTableService } from '@/arp-table/services/arp-table.service';
import { CreateArpTableDto, CreateArpTableItemDto } from '@/arp-table/dtos';

@ApiTags('Arp table')
@Controller()
export class ArpTableController {
  constructor(private readonly arpTableService: ArpTableService) {}

  @Post('/')
  @ApiOkResponse({
    type: ArpTableItemResponse,
  })
  public async create(
    @Body() dto: CreateArpTableItemDto,
  ): Promise<ArpTableItemResponse> {
    return new ArpTableItemResponse(await this.arpTableService.create(dto));
  }

  @Post('/upload-list')
  public async createList(@Body() dto: CreateArpTableDto): Promise<void> {
    await this.arpTableService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: ArpTableItemResponse,
  })
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ArpTableItemResponse> {
    console.log(id);
    return new ArpTableItemResponse(
      await this.arpTableService.getOrFailById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(ArpTableItemResponse)
  public async getList(
    @Query() pagination: PageOptionsDto,
  ): Promise<ArpTableResponse> {
    return new ArpTableResponse(await this.arpTableService.getList(pagination));
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.arpTableService.delete(id);
  }
}
