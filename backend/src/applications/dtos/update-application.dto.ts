import { PartialType } from '@nestjs/swagger';
import { ApplicationItemDto } from '@/applications/dtos';

export class UpdateSystemServiceDto extends PartialType(ApplicationItemDto) {}
