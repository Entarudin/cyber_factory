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

  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  public readonly errors: string[];

  public constructor(
    exception: { message: string } | string,
    status: number,
    errros: string[] | null,
  ) {
    this.message =
      typeof exception === 'object' ? exception.message : exception;

    this.status = status;
    this.errors = errros ?? [];
    this.timestamp = new Date().toISOString();
  }
}
