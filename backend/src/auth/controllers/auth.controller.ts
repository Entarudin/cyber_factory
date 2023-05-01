import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/auth/services/auth.service';
import { CreateUserDto } from '@/users/dtos';
import { AuthResponse } from '@/auth/controllers/auth.response';
import { AuthLoginDto, AuthRefreshDto } from '@/auth/dtos';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async registration(@Body() dto: CreateUserDto): Promise<AuthResponse> {
    return new AuthResponse(await this.authService.registration(dto));
  }

  @Post('/login')
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async login(@Body() dto: AuthLoginDto): Promise<AuthResponse> {
    return new AuthResponse(await this.authService.login(dto));
  }

  @Post('/refresh')
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async refresh(@Body() dto: AuthRefreshDto): Promise<AuthResponse> {
    return new AuthResponse(await this.authService.refresh(dto));
  }

  @Post('/logout')
  @ApiOkResponse()
  public async logout(@Body() dto: AuthRefreshDto): Promise<void> {
    await this.authService.logout(dto);
  }
}
