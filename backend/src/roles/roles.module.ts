import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './dao/entity/role.entity';
import { RolesService } from './services';
import { RolesRepository } from './repositories/roles.repository';
import { PostrgresRolesRepository } from './repositories/postgres-roles.repository';

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
