import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateCyberPhysicalSystemDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly userId: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly name: string;
}
