import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

import { UsersService } from '../services';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async getAll() {
    return await this.usersService.findAll();
  }
}
