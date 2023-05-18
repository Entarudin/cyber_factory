import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiExceptionResponse } from '@common/exceptions/api-exception';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (httpStatus >= 500) {
      this.logger.error(exception);
    }

    if (httpStatus >= 400) {
      this.logger.warn(exception);
    }

    response
      .status(httpStatus)
      .json(
        new ApiExceptionResponse(
          exception.message,
          httpStatus,
          exception?.response?.message,
        ),
      );
  }
}
