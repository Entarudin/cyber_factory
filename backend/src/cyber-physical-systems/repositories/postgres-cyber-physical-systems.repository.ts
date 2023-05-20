import { Injectable } from '@nestjs/common';
import { CyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/cyber-physical-systems.repository';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostrgresCyberPhysicalSystemsRepository extends CyberPhysicalSystemsRepository {
  constructor(
    @InjectRepository(CyberPhysicalSystemEntity)
    private readonly repository: Repository<CyberPhysicalSystemEntity>,
  ) {
    super();
  }

  public async save(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity> {
    return this.repository.save(cyberPhysicalSystem);
  }

  public async findAll(): Promise<CyberPhysicalSystemEntity[]> {
    return this.repository.find({});
  }

  public async findByName(name: string): Promise<CyberPhysicalSystemEntity> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  public async getById(id: number): Promise<CyberPhysicalSystemEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity> {
    return this.repository.save(cyberPhysicalSystem);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
