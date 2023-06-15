import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/pagination/page-options.dto';
import { PaginatedResult } from '@/common/pagination/interfaces/pagination-result.interface';
import { ApplicationEntity } from '@/applications/dao/entity/application.entity';
import { ApplicationResponse } from '@/applications/controllers/application.response';

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
