import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CyberPhysicalSystemsService } from '../services/cyber-physical-systems.service';
import { CreateCyberPhysicalSystemDto } from '../dtos';
import { CyberPhysicalSystemResponse } from './cyber-physical-system.response';

@ApiTags('Cyber Physical Systems')
@Controller()
export class CyberPhysicalSystemsController {
  constructor(
    private readonly cyberPhysicalSystemsServcie: CyberPhysicalSystemsService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: CyberPhysicalSystemResponse,
  })
  public async create(
    @Body() dto: CreateCyberPhysicalSystemDto,
  ): Promise<CyberPhysicalSystemResponse> {
    return new CyberPhysicalSystemResponse(
      await this.cyberPhysicalSystemsServcie.create(dto),
    );
  }

  @Get('/:id')
  @ApiOkResponse({
    type: CyberPhysicalSystemResponse,
  })
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CyberPhysicalSystemResponse> {
    console.log(id);
    return new CyberPhysicalSystemResponse(
      await this.cyberPhysicalSystemsServcie.getCyberPhysicalSystemExistById(
        id,
      ),
    );
  }

  @Get('/')
  public async findAll() {
    return this.cyberPhysicalSystemsServcie.findAll();
  }

  @Delete('/:id')
  public async delele(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cyberPhysicalSystemsServcie.delete(id);
  }
}
