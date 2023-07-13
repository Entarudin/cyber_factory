import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { HostEntity } from '@/hosts/dao/entity/host.entity';

export abstract class HostsRepository {
  public abstract save(host: HostEntity): Promise<HostEntity>;

  public abstract saveList(listHosts: HostEntity[]): Promise<void>;

  public abstract findAll(): Promise<HostEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<HostEntity>>;

  public abstract getById(id: number): Promise<HostEntity>;

  public abstract update(host: HostEntity): Promise<HostEntity>;

  public abstract delete(id: number): Promise<void>;
}
