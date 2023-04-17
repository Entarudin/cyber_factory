import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPair } from './dao/entity/token-pair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenPair])],
  providers: [],
})
export class TokensModule {}
