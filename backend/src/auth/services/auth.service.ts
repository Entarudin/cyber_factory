import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/services';
import { TokenPair } from 'src/tokens/dao/entity/token-pair.entity';
import { TokensService } from 'src/tokens/services/tokens.service';
import { CreateUserDto } from 'src/users/dtos';
import { UserAlreadyExistByEmailException } from 'src/users/exceptions';
import { UsersService } from 'src/users/services';
import { AuthRefreshDto } from '../dtos/auth-refresh.dto';
import {
  IncorectAuthDataException,
  RefreshTokenExpiredException,
} from '../exceptions';
import { UserEntity } from 'src/users/dao/entity/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';

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
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
  }

  public async login(fields: LoginUserDto): Promise<TokenPair> {
    const user = await this.validateUser(fields);
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
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
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
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
