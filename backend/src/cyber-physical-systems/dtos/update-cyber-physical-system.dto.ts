import { PartialType } from '@nestjs/swagger';

import { CreateCyberPhysicalSystemDto } from './create-cyber-physical-system.dto';

export class UpdateCyberPhysicalSystemDto extends PartialType(
  CreateCyberPhysicalSystemDto,
) {}
