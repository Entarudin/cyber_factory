import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './dao/entity/user.enity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [],
})
export class UsersModule {}
