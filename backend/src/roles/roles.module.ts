import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { RolesService } from '@/roles/services';
import { RolesRepository } from '@/roles/repositories/roles.repository';
import { PostrgresRolesRepository } from '@/roles/repositories/postgres-roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    RolesService,
    {
      provide: RolesRepository,
      useClass: PostrgresRolesRepository,
    },
  ],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
