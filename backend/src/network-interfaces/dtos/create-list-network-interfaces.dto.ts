import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { NetworkInterfaceItemDto } from '@/network-interfaces/dtos';

export class CreateListNetworkInterfacesDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  public readonly macAddress: string;

  public readonly items: NetworkInterfaceItemDto[];
}
