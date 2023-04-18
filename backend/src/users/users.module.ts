import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './dao/entity/user.entity';
import { UsersService } from './services';
import { PostrgresUsersRepository, UsersRepository } from './repositories';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { RolesModule } from 'src/roles/roles.module';

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
