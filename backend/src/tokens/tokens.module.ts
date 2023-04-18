import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPair } from './dao/entity/token-pair.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/configs/jwt-config';
import { TokensService } from './services/tokens.service';
import {
  PostgresTokensPairsRepository,
  TokensPairsRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenPair]),
    JwtModule.register({}),
    JwtConfigModule,
  ],
  providers: [
    TokensService,
    {
      provide: TokensPairsRepository,
      useClass: PostgresTokensPairsRepository,
    },
  ],
  exports: [TokensService, TokensPairsRepository],
})
export class TokensModule {}
