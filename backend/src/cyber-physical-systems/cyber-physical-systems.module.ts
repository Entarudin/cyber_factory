import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CyberPhysicalSystemEntity } from '@/cyber-physical-systems/dao/entity/cyber-physical-system.entity';
import { CyberPhysicalSystemsService } from '@/cyber-physical-systems/services/cyber-physical-systems.service';
import { CyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/cyber-physical-systems.repository';
import { PostgresCyberPhysicalSystemsRepository } from '@/cyber-physical-systems/repositories/postgres-cyber-physical-systems.repository';
import { UsersModule } from '@/users/users.module';
import { CyberPhysicalSystemsController } from '@/cyber-physical-systems/controllers/cyber-physical-systems.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CyberPhysicalSystemEntity]), UsersModule],
  providers: [
    CyberPhysicalSystemsService,
    {
      provide: CyberPhysicalSystemsRepository,
      useClass: PostgresCyberPhysicalSystemsRepository,
    },
  ],
  exports: [CyberPhysicalSystemsService, CyberPhysicalSystemsRepository],
  controllers: [CyberPhysicalSystemsController],
})
export class CyberPhysicalSystemsModule {}
