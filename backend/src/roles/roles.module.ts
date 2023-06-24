import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { PostgresRolesRepository } from '@/roles/repositories/postgres-roles.repository';
import { RolesRepository } from '@/roles/repositories/roles.repository';
import { RolesService } from '@/roles/services';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    RolesService,
    {
      provide: RolesRepository,
      useClass: PostgresRolesRepository,
    },
  ],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
