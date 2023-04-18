import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/services';
import { TokenPair } from 'src/tokens/dao/entity/token-pair.entity';
import { TokensService } from 'src/tokens/services/tokens.service';
import { CreateUserDto } from 'src/users/dtos';
import { UserAlreadyExistByEmailExeption } from 'src/users/exeptions';
import { UsersService } from 'src/users/services';
import { AuthRefreshDto } from '../dtos/auth-refresh.dto';
import {
  IncorectAuthDataExeption,
  RefreshTokenExpiredException,
} from '../exeptions';
import { UserEntity } from 'src/users/dao/entity/user.entity';

export type LoginUserType = Omit<CreateUserDto, 'role'>;

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
      throw new UserAlreadyExistByEmailExeption();
    }
    const user = await this.userService.create(dto);
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
  }

  public async login(fields: LoginUserType): Promise<TokenPair> {
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

  private async validateUser(fields: LoginUserType): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(fields.email);
    if (!user) {
      throw new IncorectAuthDataExeption();
    }
    const passwordEquals = await this.bcryptService.compareHash(
      fields.passwordHash,
      user.passwordHash,
    );
    if (!passwordEquals) {
      throw new IncorectAuthDataExeption();
    }
    return user;
  }
}
