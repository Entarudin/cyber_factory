import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { SystemServiceEntity } from '@/system-services/dao/entity/system-service.entity';

export abstract class SystemServicesRepository {
  public abstract save(
    systemService: SystemServiceEntity,
  ): Promise<SystemServiceEntity>;

  public abstract saveList(
    listSystemService: SystemServiceEntity[],
  ): Promise<void>;

  public abstract findAll(): Promise<SystemServiceEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<SystemServiceEntity>>;

  public abstract getById(id: number): Promise<SystemServiceEntity>;

  public abstract update(
    systemService: SystemServiceEntity,
  ): Promise<SystemServiceEntity>;

  public abstract delete(id: number): Promise<void>;
}
