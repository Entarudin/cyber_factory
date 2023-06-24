import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { RolesModule } from '@/roles/roles.module';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { PostgresUsersRepository, UsersRepository } from '@/users/repositories';
import { UsersService } from '@/users/services';

import { UsersController } from './controllers/user.controller';

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
      useClass: PostgresUsersRepository,
    },
  ],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
