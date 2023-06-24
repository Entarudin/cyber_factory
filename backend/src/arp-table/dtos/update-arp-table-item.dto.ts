import { PartialType } from '@nestjs/swagger';

import { ArpTableItemDto } from '@/arp-table/dtos';

export class UpdateArpTableItemDto extends PartialType(ArpTableItemDto) {}
