import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensPairsRepository } from '../repositories/tokens-pairs.repository';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from 'src/roles/dao/entity/role.entity';
import { CreateTokenDto } from '../dtos';
import { TokenPair } from '../dao/entity/token-pair.entity';
import { TokensByRefreshTokenNotFoundExeption } from '../exeptions';
import { UserEntity } from 'src/users/dao/entity/user.entity';
import { IJwtConfig } from 'src/configs/jwt-config';
import { ConfigNamespacesEnum } from 'src/common/config-namespaces.enum';

export type JwtTokenPaylod = {
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

  public async create(dto: CreateTokenDto): Promise<TokenPair> {
    const countTokens = await this.getCountTokensByUserId(dto.userId);
    if (countTokens && countTokens >= 10) {
      await this.tokensRepository.deleteByUserId(dto.userId);
    }
    const tokenPair = new TokenPair();
    tokenPair.accessToken = dto.accessToken;
    tokenPair.refreshToken = dto.refreshToken;
    tokenPair.userId = dto.userId;
    return await this.tokensRepository.save(tokenPair);
  }

  public async findByRefreshToken(refreshToken: string): Promise<TokenPair> {
    return await this.tokensRepository.findByRefreshToken(refreshToken);
  }

  public async deleteToken(refreshToken: string): Promise<void> {
    const findToken = await this.findByRefreshToken(refreshToken);
    if (!findToken) {
      throw new TokensByRefreshTokenNotFoundExeption();
    }
    await this.tokensRepository.delete(findToken.id);
  }

  public async generateTokens(user: UserEntity): Promise<TokenPair> {
    const payload: JwtTokenPaylod = {
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
    return await this.create(dto);
  }

  public async validateAccessToken(
    token: string,
  ): Promise<JwtTokenPaylod | null> {
    try {
      const userData: JwtTokenPaylod = this.jwtService.verify(token, {
        secret: this.jwtConfig.accessTokenSecret,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  public async validateRefreshToken(
    token: string,
  ): Promise<JwtTokenPaylod | null> {
    try {
      const userData: JwtTokenPaylod = this.jwtService.verify(token, {
        secret: this.jwtConfig.refreshTokenSecret,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  private readonly jwtConfig = this.configService.get<IJwtConfig>(
    ConfigNamespacesEnum.JWT,
  );

  private async generateAccessToken(paylod: JwtTokenPaylod): Promise<string> {
    return this.jwtService.sign(paylod, {
      secret: this.jwtConfig.accessTokenSecret,
      expiresIn: this.jwtConfig.accessTokenExpiration,
    });
  }

  private async generateRefreshToken(paylod: JwtTokenPaylod): Promise<string> {
    return this.jwtService.sign(paylod, {
      secret: this.jwtConfig.refreshTokenSecret,
      expiresIn: this.jwtConfig.refreshTokenExpiration,
    });
  }

  private async getCountTokensByUserId(userId: number): Promise<number> {
    const [, count] = await this.tokensRepository.findByUserId(userId);
    return count;
  }
}
