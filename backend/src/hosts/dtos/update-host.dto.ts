import { PartialType } from '@nestjs/swagger';

import { HostItemDto } from '@/hosts/dtos';

export class UpdateHostDto extends PartialType(HostItemDto) {}
