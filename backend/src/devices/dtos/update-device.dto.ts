import { PartialType } from '@nestjs/swagger';

import { CreateDeviceDto } from '@/devices/dtos';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
