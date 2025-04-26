// -exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { errorHandlers } from '../error-handlers'
import { StandardError } from '../error.interfaces'

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const handler = errorHandlers[exception.name] as
      | ((exception: Error, request: Request) => StandardError)
      | undefined

    let error: StandardError

    if (handler && typeof handler === 'function') {
      error = handler(exception, request)
    } else {
      error = {
        timestamp: new Date().toISOString(),
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
        message: exception.message || 'Unexpected error',
        path: request.url,
      }
    }

    response.status(error.status).json(error)
  }
}
