import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Order, TakePages } from './constants';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  public readonly order?: Order = Order.ASC;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly orderBy?: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: TakePages.MIN,
    maximum: TakePages.MAX,
    default: TakePages.DEFAULT,
  })
  @Type(() => Number)
  @IsInt()
  @Min(TakePages.MIN)
  @Max(TakePages.MAX)
  @IsOptional()
  public readonly take?: number = TakePages.DEFAULT;

  public get skip(): number {
    return (this.page - 1) * this.take;
  }
}
