import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';

import { AuthResponse } from '@/auth/controllers/auth.response';
import { AuthLoginDto } from '@/auth/dtos';
import { AuthService } from '@/auth/services/auth.service';
import { CreateUserDto } from '@/users/dtos';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/registration')
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const tokens = await this.authService.registration(dto);

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookiesOptionsRefreshToken,
    );

    return new AuthResponse(tokens);
  }

  @Post('/login')
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async login(
    @Body() dto: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const tokens = await this.authService.login(dto);

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookiesOptionsRefreshToken,
    );

    return new AuthResponse(tokens);
  }

  @Get('/refresh')
  @ApiCookieAuth()
  @ApiOkResponse({
    type: AuthResponse,
  })
  public async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<AuthResponse> {
    const refreshToken = request.cookies['refreshToken'] as string;
    const tokens = await this.authService.refresh({ refreshToken });

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookiesOptionsRefreshToken,
    );

    return new AuthResponse(tokens);
  }

  @Get('/logout')
  @ApiCookieAuth()
  @ApiOkResponse()
  public async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const refreshToken = request.cookies['refreshToken'] as string;

    await this.authService.logout({ refreshToken });

    response.cookie('refreshToken', '', { maxAge: 1 });
  }

  private readonly maxAgeRefreshToken: number =
    parseInt(this.configService.get('JWT_REFRESH_EXPIRATION_IN_DAYS')) *
    3600 *
    24 *
    1000;

  private readonly getCookiesOptionsRefreshToken: CookieOptions = {
    httpOnly: true,
    maxAge: this.maxAgeRefreshToken,
    expires: new Date(Date.now() + this.maxAgeRefreshToken),
  };
}
