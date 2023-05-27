import { CreateUserDto } from '@/users/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
