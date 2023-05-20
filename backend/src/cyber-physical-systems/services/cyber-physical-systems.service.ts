import { UsersService } from '@/users/services';
import { CyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/cyber-physical-systems.repository';
import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  CreateCyberPhysicalSystemDto,
  UpdateCyberPhysicalSystemDto,
} from '@/cyber-physical-systems/dtos';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import {
  CyberPhysicalSystemAlreadyExistByNameException,
  CyberPhysicalSystemByIdNotFoundException,
} from '@/cyber-physical-systems/exceptions';

@Injectable()
export class CyberPhysicalSystemsService {
  constructor(
    private readonly cyberPhysicalSystemsRepository: CyberPhysicalSystemsRepository,
    private readonly usersService: UsersService,
  ) {}

  public async create(
    dto: CreateCyberPhysicalSystemDto,
  ): Promise<CyberPhysicalSystemEntity> {
    const user = await this.usersService.getUserExistById(dto.userId);
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
    throw new NotImplementedException();
  }

  public async findById(id: number): Promise<CyberPhysicalSystemEntity> {
    return this.cyberPhysicalSystemsRepository.getById(id);
  }

  public async findAll(): Promise<CyberPhysicalSystemEntity[]> {
    return this.cyberPhysicalSystemsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    await this.getCyberPhysicalSystemExistById(id);
    await this.cyberPhysicalSystemsRepository.delete(id);
  }

  private async getCyberPhysicalSystemExistById(
    id: number,
  ): Promise<CyberPhysicalSystemEntity> {
    const existCyberPhysicalSystem = await this.findById(id);
    if (!existCyberPhysicalSystem) {
      throw new CyberPhysicalSystemByIdNotFoundException();
    }
    return existCyberPhysicalSystem;
  }
}
