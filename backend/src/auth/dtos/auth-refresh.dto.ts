import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly refreshToken: string;
}
