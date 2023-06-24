import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from '@/health/controllers';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
