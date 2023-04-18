import { ApiProperty } from '@nestjs/swagger';
import { TokenPair } from 'src/tokens/dao/entity/token-pair.entity';

export class AuthResponse {
  @ApiProperty()
  public readonly accessToken: string;

  @ApiProperty()
  public readonly refreshToken: string;

  constructor(tokenEntity: TokenPair) {
    this.accessToken = tokenEntity.accessToken;
    this.refreshToken = tokenEntity.refreshToken;
  }
}
