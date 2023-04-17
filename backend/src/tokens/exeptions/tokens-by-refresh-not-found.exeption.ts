import { NotFoundException } from '@nestjs/common';

export class TokensByRefreshTokenNotFoundExeption extends NotFoundException {
  constructor() {
    super(`Token Entity with refreshToken  not found`);
  }
}
