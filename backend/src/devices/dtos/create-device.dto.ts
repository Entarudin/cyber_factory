import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsIP, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsIP()
  @IsDefined()
  public readonly ipAddress: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly networkInterface: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsDefined()
  public readonly cyberPhysicalSystemId: number;
}
