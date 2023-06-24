import { Injectable } from '@nestjs/common';

import { AuthLoginDto } from '@/auth/dtos/auth-login.dto';
import { AuthRefreshDto } from '@/auth/dtos/auth-refresh.dto';
import {
  IncorrectAuthDataException,
  RefreshTokenExpiredException,
} from '@/auth/exceptions';
import { BcryptService } from '@/bcrypt/services';
import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { TokensService } from '@/tokens/services/tokens.service';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { CreateUserDto } from '@/users/dtos';
import { UserAlreadyExistByEmailException } from '@/users/exceptions';
import { UsersService } from '@/users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokensService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async registration(dto: CreateUserDto): Promise<TokenPairEntity> {
    const existUser = await this.userService.getByEmail(dto.email);
    if (existUser) {
      throw new UserAlreadyExistByEmailException();
    }
    const user = await this.userService.create(dto);
    return this.tokenService.generateTokens(user);
  }

  public async login(fields: AuthLoginDto): Promise<TokenPairEntity> {
    const user = await this.validateUser(fields);
    return this.tokenService.generateTokens(user);
  }

  public async refresh(dto: AuthRefreshDto): Promise<TokenPairEntity> {
    const userData = await this.tokenService.validateRefreshToken(
      dto.refreshToken,
    );
    const tokenFromDb = await this.tokenService.findByRefreshToken(
      dto.refreshToken,
    );

    if (!userData || !tokenFromDb) {
      throw new RefreshTokenExpiredException();
    }
    const user = await this.userService.findById(userData.id);
    await this.tokenService.deleteToken(dto.refreshToken);
    return this.tokenService.generateTokens(user);
  }

  public async logout(dto: AuthRefreshDto): Promise<void> {
    await this.tokenService.deleteToken(dto.refreshToken);
  }

  private async validateUser(fields: AuthLoginDto): Promise<UserEntity> {
    const user = await this.userService.getByEmail(fields.email);
    if (!user) {
      throw new IncorrectAuthDataException();
    }
    const passwordEquals = await this.bcryptService.compareHash(
      fields.password,
      user.passwordHash,
    );
    if (!passwordEquals) {
      throw new IncorrectAuthDataException();
    }
    return user;
  }
}
