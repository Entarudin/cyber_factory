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
import { UsersController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BcryptModule,
    RolesModule,
    JwtModule,
  ],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PostrgresUsersRepository,
    },
  ],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
