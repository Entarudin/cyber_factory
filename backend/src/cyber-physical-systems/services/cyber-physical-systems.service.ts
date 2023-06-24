import { Injectable } from '@nestjs/common';

import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import {
  CreateCyberPhysicalSystemDto,
  UpdateCyberPhysicalSystemDto,
} from '@/cyber-physical-systems/dtos';
import {
  CyberPhysicalSystemAlreadyExistByNameException,
  CyberPhysicalSystemByIdNotFoundException,
} from '@/cyber-physical-systems/exceptions';
import { CyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/cyber-physical-systems.repository';
import { UsersService } from '@/users/services';

@Injectable()
export class CyberPhysicalSystemsService {
  constructor(
    private readonly cyberPhysicalSystemsRepository: CyberPhysicalSystemsRepository,
    private readonly usersService: UsersService,
  ) {}

  public async create(
    dto: CreateCyberPhysicalSystemDto,
  ): Promise<CyberPhysicalSystemEntity> {
    const user = await this.usersService.getOrFailById(dto.userId);
    const existCyberPhysicalSystem = await this.getByName(dto.name);

    if (existCyberPhysicalSystem) {
      throw new CyberPhysicalSystemAlreadyExistByNameException();
    }

    const cyberPhysicalSystem = new CyberPhysicalSystemEntity();
    cyberPhysicalSystem.name = dto.name;
    cyberPhysicalSystem.users = [user];
    return this.cyberPhysicalSystemsRepository.save(cyberPhysicalSystem);
  }

  public async getByName(
    name: string,
  ): Promise<CyberPhysicalSystemEntity | null> {
    return this.cyberPhysicalSystemsRepository.findByName(name);
  }

  public async update(
    id: number,
    dto: UpdateCyberPhysicalSystemDto,
  ): Promise<CyberPhysicalSystemEntity> {
    const cyberPhysicalSystem = await this.getOrFailById(id);
    cyberPhysicalSystem.name = dto.name;
    return this.cyberPhysicalSystemsRepository.save(cyberPhysicalSystem);
  }

  public async findById(id: number): Promise<CyberPhysicalSystemEntity> {
    return this.cyberPhysicalSystemsRepository.getById(id);
  }

  public async findAll(): Promise<CyberPhysicalSystemEntity[]> {
    return this.cyberPhysicalSystemsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getOrFailById(id);
    await this.cyberPhysicalSystemsRepository.delete(id);
  }

  public async getList(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CyberPhysicalSystemEntity>> {
    return this.cyberPhysicalSystemsRepository.findBy(pagination);
  }

  public async getOrFailById(id: number): Promise<CyberPhysicalSystemEntity> {
    const existCyberPhysicalSystem = await this.findById(id);
    if (!existCyberPhysicalSystem) {
      throw new CyberPhysicalSystemByIdNotFoundException();
    }
    return existCyberPhysicalSystem;
  }
}
