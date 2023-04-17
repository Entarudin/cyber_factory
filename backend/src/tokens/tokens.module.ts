import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPair } from './dao/entity/token-pair.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/configs/jwt-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenPair]),
    JwtModule.register({}),
    JwtConfigModule,
  ],
  providers: [],
})
export class TokensModule {}
