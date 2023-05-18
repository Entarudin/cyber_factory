import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AuthRefreshDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  readonly refreshToken: string;
}
