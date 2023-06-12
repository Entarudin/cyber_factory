import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { SystemServiceItemDto } from '@/system-services/dtos';

export class CreateListSystemServicesDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  public readonly items: SystemServiceItemDto[];
}
