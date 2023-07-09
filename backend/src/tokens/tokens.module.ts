import { JwtConfigModule } from '@configs/jwt-config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { PostgresTokensPairsRepository } from '@/tokens/repositories/postrgres-tokens-pairs.repository';
import { TokensPairsRepository } from '@/tokens/repositories/tokens-pairs.repository';
import { TokensService } from '@/tokens/services/tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenPairEntity]),
    JwtModule,
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
