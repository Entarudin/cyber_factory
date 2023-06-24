import { ApiProperty } from '@nestjs/swagger';

import { ApplicationResponse } from '@/applications/controllers/application.response';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';

export class ApplicationsListResponse {
  @ApiProperty()
  public readonly meta: Partial<PageOptionsDto>;

  @ApiProperty({
    type: ApplicationResponse,
    isArray: true,
  })
  public readonly items: ApplicationResponse[];

  constructor({ meta, items }: PaginatedResult<ApplicationEntity>) {
    this.meta = meta;
    this.items = items.map(
      (application) => new ApplicationResponse(application),
    );
  }
}
