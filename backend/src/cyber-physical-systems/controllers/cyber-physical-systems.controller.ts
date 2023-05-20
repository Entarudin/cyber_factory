import { Controller, Post, Body } from '@nestjs/common';
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
}
