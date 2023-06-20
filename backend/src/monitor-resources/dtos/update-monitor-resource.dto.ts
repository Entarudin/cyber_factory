import { PartialType } from '@nestjs/swagger';
import { MonitorResourceItemDto } from '@/monitor-resources/dtos';

export class UpdateMonitorResourceDto extends PartialType(
  MonitorResourceItemDto,
) {}
