import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, LoginUserType } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dtos';
import { TokenPair } from 'src/tokens/dao/entity/token-pair.entity';
import { AuthRefreshDto } from '../dtos/auth-refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  public async registration(@Body() dto: CreateUserDto): Promise<TokenPair> {
    const tokens = await this.authService.registration(dto);
    return tokens;
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserType): Promise<TokenPair> {
    const tokens = await this.authService.login(dto);
    return tokens;
  }

  @Post('/refresh')
  public async refresh(@Body() dto: AuthRefreshDto): Promise<TokenPair> {
    const tokens = await this.authService.refresh(dto);
    return tokens;
  }

  @Post('/logout')
  public async logout(@Body() dto: AuthRefreshDto): Promise<void> {
    return await this.authService.logout(dto);
  }
}
