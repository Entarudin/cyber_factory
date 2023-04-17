import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly passwordHash: string;
}
