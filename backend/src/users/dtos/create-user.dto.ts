import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../../common/roles.enum';

export class CreateUserDto {
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

  @ApiProperty({
    required: true,
    enum: RolesEnum,
  })
  @IsEnum(RolesEnum)
  @IsDefined()
  readonly role: string;
}
