import { PartialType } from '@nestjs/swagger';

import { SystemServiceItemDto } from '@/system-services/dtos';

export class UpdateSystemServiceDto extends PartialType(SystemServiceItemDto) {}
