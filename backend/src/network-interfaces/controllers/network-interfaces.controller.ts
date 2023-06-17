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
import { NetworkInterfaceResponse } from '@/network-interfaces/controllers/network-interface.response';
import { NetworkInterfacesListResponse } from '@/network-interfaces/controllers/network-interfaces-list.response';
import { NetworkInterfacesService } from '@/network-interfaces/services/network-interfaces.service';
import {
  CreateListNetworkInterfacesDto,
  CreateNetworkInterfaceDto,
} from '@/network-interfaces/dtos';

@ApiTags('Network Interfaces')
@Controller()
export class NetworkInterfacesController {
  constructor(
    private readonly networkInterfacesService: NetworkInterfacesService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: NetworkInterfaceResponse,
  })
  public async create(
    @Body() dto: CreateNetworkInterfaceDto,
  ): Promise<NetworkInterfaceResponse> {
    return new NetworkInterfaceResponse(
      await this.networkInterfacesService.create(dto),
    );
  }

  @Post('/upload-list')
  public async createList(
    @Body() dto: CreateListNetworkInterfacesDto,
  ): Promise<void> {
    await this.networkInterfacesService.createList(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: NetworkInterfaceResponse,
  })
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NetworkInterfaceResponse> {
    console.log(id);
    return new NetworkInterfaceResponse(
      await this.networkInterfacesService.getExistNetworkInterfaceById(id),
    );
  }

  @Get('/')
  @ApiPaginatedResponse(NetworkInterfaceResponse)
  public async findAll(
    @Query() pagination: PageOptionsDto,
  ): Promise<NetworkInterfacesListResponse> {
    return new NetworkInterfacesListResponse(
      await this.networkInterfacesService.getList(pagination),
    );
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.networkInterfacesService.delete(id);
  }
}
