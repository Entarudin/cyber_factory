import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { CountPacketsEntity } from '@/count-packets/dao/entity/count-packets.entity';

export abstract class CountPacketsRepository {
  public abstract save(
    countPackets: CountPacketsEntity,
  ): Promise<CountPacketsEntity>;

  public abstract findAll(): Promise<CountPacketsEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<CountPacketsEntity>>;

  public abstract getById(id: number): Promise<CountPacketsEntity>;

  public abstract update(
    countPackets: CountPacketsEntity,
  ): Promise<CountPacketsEntity>;

  public abstract delete(id: number): Promise<void>;
}
