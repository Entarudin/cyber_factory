import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly accessToken: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly refreshToken: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  readonly userId: number;
}
