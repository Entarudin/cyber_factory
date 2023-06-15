import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';

export abstract class ApplicationsRepository {
  public abstract save(
    application: ApplicationEntity,
  ): Promise<ApplicationEntity>;

  public abstract saveList(
    listApplications: ApplicationEntity[],
  ): Promise<void>;

  public abstract findAll(): Promise<ApplicationEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ApplicationEntity>>;

  public abstract getById(id: number): Promise<ApplicationEntity>;

  public abstract update(
    application: ApplicationEntity,
  ): Promise<ApplicationEntity>;

  public abstract delete(id: number): Promise<void>;
}
