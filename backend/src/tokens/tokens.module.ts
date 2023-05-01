import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@configs/jwt-config';
import { TokensService } from '@/tokens/services/tokens.service';
import {
  PostgresTokensPairsRepository,
  TokensPairsRepository,
} from '@/tokens/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenPairEntity]),
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
