import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsEmail()
  @IsDefined()
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  readonly passwordHash: string;
}
