import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { ApplicationItemDto } from '@/applications/dtos';

export class CreateListApplicationsDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  public readonly items: ApplicationItemDto[];
}
