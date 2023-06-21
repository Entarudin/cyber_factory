import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { ArpTableItemDto } from '@/arp-table/dtos';

export class CreateArpTableDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly deviceMacAddress: string;

  public readonly items: ArpTableItemDto[];
}
