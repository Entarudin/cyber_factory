import { CreateUserDto } from '@/users/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateDeviceDto extends PartialType(CreateUserDto) {}
