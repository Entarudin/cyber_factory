import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { MonitorResourceEntity } from '@/monitor-resources/dao/entity/monitor-resource.entity';

export abstract class MonitorResourcesRepository {
  public abstract save(
    monitorResource: MonitorResourceEntity,
  ): Promise<MonitorResourceEntity>;

  public abstract findAll(): Promise<MonitorResourceEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<MonitorResourceEntity>>;

  public abstract getById(id: number): Promise<MonitorResourceEntity>;

  public abstract update(
    monitorResource: MonitorResourceEntity,
  ): Promise<MonitorResourceEntity>;

  public abstract delete(id: number): Promise<void>;
}
