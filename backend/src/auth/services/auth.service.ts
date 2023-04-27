import { Injectable } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/services';
import { TokenPair } from '@/tokens/dao/entity/token-pair.entity';
import { TokensService } from '@/tokens/services/tokens.service';
import { CreateUserDto } from '@/users/dtos';
import { UserAlreadyExistByEmailException } from '@/users/exceptions';
import { UsersService } from '@/users/services';
import { AuthRefreshDto } from '@/auth/dtos/auth-refresh.dto';
import {
  IncorectAuthDataException,
  RefreshTokenExpiredException,
} from '@/auth/exceptions';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { LoginUserDto } from '@/auth/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokensService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async registration(dto: CreateUserDto): Promise<TokenPair> {
    const existUser = await this.userService.getUserByEmail(dto.email);
    if (existUser) {
      throw new UserAlreadyExistByEmailException();
    }
    const user = await this.userService.create(dto);
    return this.tokenService.generateTokens(user);
  }

  public async login(fields: LoginUserDto): Promise<TokenPair> {
    const user = await this.validateUser(fields);
    return this.tokenService.generateTokens(user);
  }

  public async refresh(dto: AuthRefreshDto): Promise<TokenPair> {
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

  private async validateUser(fields: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(fields.email);
    if (!user) {
      throw new IncorectAuthDataException();
    }
    const passwordEquals = await this.bcryptService.compareHash(
      fields.password,
      user.passwordHash,
    );
    if (!passwordEquals) {
      throw new IncorectAuthDataException();
    }
    return user;
  }
}
