import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';

export abstract class CyberPhysicalSystemsRepository {
  public abstract save(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity>;

  public abstract findAll(): Promise<CyberPhysicalSystemEntity[]>;

  public abstract findByName(name: string): Promise<CyberPhysicalSystemEntity>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CyberPhysicalSystemEntity>>;

  public abstract getById(id: number): Promise<CyberPhysicalSystemEntity>;

  public abstract update(
    cyberPhysicalSystem: CyberPhysicalSystemEntity,
  ): Promise<CyberPhysicalSystemEntity>;

  public abstract delete(id: number): Promise<void>;
}
