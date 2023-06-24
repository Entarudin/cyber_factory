import { PartialType } from '@nestjs/swagger';

import { ApplicationItemDto } from '@/applications/dtos';

export class UpdateApplicationDto extends PartialType(ApplicationItemDto) {}
