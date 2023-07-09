import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '@/devices/devices.module';
import { StructuralFunctionalCharacteristicsController } from '@/structural-functional-characteristics/controllers/structural-functional-characteristics.controller';
import { StructuralFunctionalCharacteristicEntity } from '@/structural-functional-characteristics/dao/entity/structural-functional-characteristic.entity';
import { PostgresStructuralFunctionalCharacteristicsRepository } from '@/structural-functional-characteristics/repositories/postgres-structural-functional-characteristics.repository';
import { StructuralFunctionalCharacteristicsRepository } from '@/structural-functional-characteristics/repositories/structural-functional-characteristics.repository';
import { StructuralFunctionalCharacteristicsService } from '@/structural-functional-characteristics/services/structural-functional-characteristics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StructuralFunctionalCharacteristicEntity]),
    DevicesModule,
  ],
  providers: [
    StructuralFunctionalCharacteristicsService,
    {
      provide: StructuralFunctionalCharacteristicsRepository,
      useClass: PostgresStructuralFunctionalCharacteristicsRepository,
    },
  ],
  exports: [
    StructuralFunctionalCharacteristicsService,
    StructuralFunctionalCharacteristicsRepository,
  ],
  controllers: [StructuralFunctionalCharacteristicsController],
})
export class StructuralFunctionalCharacteristicsModule {}
