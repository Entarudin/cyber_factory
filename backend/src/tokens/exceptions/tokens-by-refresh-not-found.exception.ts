import { NotFoundException } from '@nestjs/common';

export class TokensByRefreshTokenNotFoundException extends NotFoundException {
  constructor() {
    super(`Token Entity with refreshToken not found`);
  }
}
