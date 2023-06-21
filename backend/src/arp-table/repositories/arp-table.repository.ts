import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PageDto } from '@/common/pagination/page.dto';
import {
  ArpTable,
  ArpTableItemEntity,
} from '@/arp-table/dao/entity/arp-table.entity';

export abstract class ArpTableRepository {
  public abstract save(
    arpTableItem: ArpTableItemEntity,
  ): Promise<ArpTableItemEntity>;

  public abstract saveList(arpTable: ArpTable): Promise<void>;

  public abstract findAll(): Promise<ArpTable>;

  public abstract findBy(
    pagination: PageOptionsDto,
  ): Promise<PageDto<ArpTableItemEntity>>;

  public abstract getById(id: number): Promise<ArpTableItemEntity>;

  public abstract update(
    arpTableItem: ArpTableItemEntity,
  ): Promise<ArpTableItemEntity>;

  public abstract delete(id: number): Promise<void>;
}
