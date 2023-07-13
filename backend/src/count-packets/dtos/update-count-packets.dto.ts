import { PartialType } from '@nestjs/swagger';

import { CountPacketsItemDto } from '@/count-packets/dtos';

export class UpdateCountPacketsDto extends PartialType(CountPacketsItemDto) {}
