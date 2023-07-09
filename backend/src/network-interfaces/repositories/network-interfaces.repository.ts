import { PageDto } from '@/common/pagination/page.dto';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { NetworkInterfaceEntity } from '@/network-interfaces/dao/entity/network-interface.entity';

export abstract class NetworkInterfacesRepository {
  public abstract save(
    networkInterface: NetworkInterfaceEntity,
  ): Promise<NetworkInterfaceEntity>;

  public abstract saveList(
    listNetworkInterfaces: NetworkInterfaceEntity[],
  ): Promise<void>;

  public abstract findAll(): Promise<NetworkInterfaceEntity[]>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<NetworkInterfaceEntity>>;

  public abstract getById(id: number): Promise<NetworkInterfaceEntity>;

  public abstract update(
    networkInterface: NetworkInterfaceEntity,
  ): Promise<NetworkInterfaceEntity>;

  public abstract delete(id: number): Promise<void>;
}
