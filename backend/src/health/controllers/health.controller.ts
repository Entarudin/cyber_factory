import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Api')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('readiness')
  @HealthCheck()
  checkDatabase() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get('liveness')
  @HealthCheck()
  checkLiveness() {
    return 'I am liveness';
  }
}
