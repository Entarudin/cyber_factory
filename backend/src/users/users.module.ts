import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { UsersService } from '@/users/services';
import {
  PostrgresUsersRepository,
  UsersRepository,
} from '@/users/repositories';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { RolesModule } from '@/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule, RolesModule],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PostrgresUsersRepository,
    },
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
