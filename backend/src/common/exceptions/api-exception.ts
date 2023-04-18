import { ApiProperty } from '@nestjs/swagger';

export class ApiExceptionResponse {
  @ApiProperty({
    type: 'string',
  })
  public readonly message: string;

  @ApiProperty({
    type: 'string',
  })
  public readonly status: number;

  @ApiProperty({
    type: 'string',
  })
  public readonly timestamp: string;

  public constructor(exception: { message: string } | string, status: number) {
    this.message =
      typeof exception === 'object' ? exception.message : exception;

    this.status = status;
    this.timestamp = new Date().toISOString();
  }
}
