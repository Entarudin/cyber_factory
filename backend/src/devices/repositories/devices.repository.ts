import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import { DeviceEntity } from '@/devices/dao/entity/device.entity';

export abstract class DevicesRepository {
  public abstract save(device: DeviceEntity): Promise<DeviceEntity>;

  public abstract findAll(): Promise<DeviceEntity[]>;

  public abstract findByName(name: string): Promise<DeviceEntity>;

  public abstract findByIpAddress(ipAddress: string): Promise<DeviceEntity>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<DeviceEntity>>;

  public abstract getById(id: number): Promise<DeviceEntity>;

  public abstract update(device: DeviceEntity): Promise<DeviceEntity>;

  public abstract delete(id: number): Promise<void>;
}
