import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensPairsRepository } from '@/tokens/repositories/tokens-pairs.repository';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from '@/roles/dao/entity/role.entity';
import { CreateTokenDto } from '@/tokens/dtos';
import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { TokensByRefreshTokenNotFoundException } from '@/tokens/exceptions';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { IJwtConfig } from '@configs/jwt-config';
import { ConfigNamespacesEnum } from '@common/constants/config-namespaces.enum';

export type JwtTokenPayload = {
  id: number;
  email: string;
  roles: RoleEntity[];
};

@Injectable()
export class TokensService {
  constructor(
    private readonly tokensRepository: TokensPairsRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async create(dto: CreateTokenDto): Promise<TokenPairEntity> {
    const countTokens = await this.getCountTokensByUserId(dto.userId);
    if (countTokens && countTokens >= 10) {
      await this.tokensRepository.deleteByUserId(dto.userId);
    }
    const tokenPair = new TokenPairEntity();
    tokenPair.accessToken = dto.accessToken;
    tokenPair.refreshToken = dto.refreshToken;
    tokenPair.userId = dto.userId;
    return this.tokensRepository.save(tokenPair);
  }

  public async findByRefreshToken(
    refreshToken: string,
  ): Promise<TokenPairEntity> {
    return this.tokensRepository.findByRefreshToken(refreshToken);
  }

  public async deleteToken(refreshToken: string): Promise<void> {
    const findToken = await this.findByRefreshToken(refreshToken);
    if (!findToken) {
      throw new TokensByRefreshTokenNotFoundException();
    }
    await this.tokensRepository.delete(findToken.id);
  }

  public async generateTokens(user: UserEntity): Promise<TokenPairEntity> {
    const payload: JwtTokenPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    const dto: CreateTokenDto = {
      accessToken,
      refreshToken,
      userId: user.id,
    };
    return this.create(dto);
  }

  public async validateAccessToken(
    token: string,
  ): Promise<JwtTokenPayload | null> {
    try {
      const userData: JwtTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtConfig.accessTokenSecret,
        },
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  public async validateRefreshToken(
    token: string,
  ): Promise<JwtTokenPayload | null> {
    try {
      const userData: JwtTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtConfig.refreshTokenSecret,
        },
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  private readonly jwtConfig = this.configService.get<IJwtConfig>(
    ConfigNamespacesEnum.JWT,
  );

  private async generateAccessToken(payload: JwtTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessTokenSecret,
      expiresIn: this.jwtConfig.accessTokenExpiration,
    });
  }

  private async generateRefreshToken(
    payload: JwtTokenPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshTokenSecret,
      expiresIn: this.jwtConfig.refreshTokenExpiration,
    });
  }

  private async getCountTokensByUserId(userId: number): Promise<number> {
    const [, count] = await this.tokensRepository.findByUserId(userId);
    return count;
  }
}
