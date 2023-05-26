import { PageMetaDto } from '../page-meta.dto';

export interface PaginatedResult<T = unknown> {
  readonly meta: PageMetaDto;
  readonly items: T[];
}
