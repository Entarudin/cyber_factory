import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({
    required: true,
  })
  readonly role: string;
}
