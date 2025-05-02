import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  BadRequestError,
  ConflictError,
  DataIntegrityViolationError,
  EntityNotFoundError,
  ErrorConstants,
  MethodArgumentNotValidError,
  NotAllwedError,
  ResourceNotFoundError,
} from '@shared/core';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

interface StandardError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

interface ValidationError extends StandardError {
  errors?: Array<{ field: string; message: string }>;
}

@Catch() // Captura qualquer tipo de erro (Error, HttpException, ZodError, etc.)
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name); // Instância do logger

  catch(exception: Error | ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: StandardError | ValidationError = {
      timestamp: new Date().toISOString(),
      status,
      error: 'Internal server error',
      message: exception.message || 'Unexpected error',
      path: request.url,
    };

    // Verificação explícita para ZodError
    if (exception instanceof ZodError) {
      this.logger.error('Zod validation error detected'); // Logando o erro de Zod

      status = HttpStatus.UNPROCESSABLE_ENTITY;
      const validationError: ValidationError = {
        ...error,
        status,
        error: ErrorConstants.INTEGRITY_VIOLATION,
        message: 'Validation failed',
        errors: exception.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      };

      return response.status(status).json(validationError);
    }

    // Verificação explícita para ConflictError
    if (exception instanceof ConflictError) {
      this.logger.error('ConflictError validation error detected'); // Logando o erro de Zod

      status = HttpStatus.CONFLICT;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.CONFLICT_ERROR,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para ResourceNotFoundError
    if (exception instanceof ResourceNotFoundError) {
      this.logger.error('ResourceNotFoundError validation error detected'); // Logando o erro de Zod

      status = HttpStatus.NOT_FOUND;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.RESOURCE_NOT_FOUND,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para EntityNotFoundError
    if (exception instanceof EntityNotFoundError) {
      this.logger.error('EntityNotFoundError validation error detected'); // Logando o erro de Zod

      status = HttpStatus.NOT_FOUND;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.NOT_FOUND,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para EntityNotFoundError
    if (exception instanceof NotAllwedError) {
      this.logger.error('NotAllwedError validation error detected'); // Logando o erro de Zod

      status = HttpStatus.METHOD_NOT_ALLOWED;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.METHOD_NOT_ALLOWED,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para DataIntegrityViolationError
    if (exception instanceof DataIntegrityViolationError) {
      this.logger.error(
        'DataIntegrityViolationError validation error detected',
      ); // Logando o erro de Zod

      status = HttpStatus.NOT_FOUND;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.DATA_INTEGRITY_VIOLATION,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para BadRequestError
    if (exception instanceof BadRequestError) {
      this.logger.error('BadRequestError validation error detected'); // Logando o erro de Zod

      status = HttpStatus.BAD_REQUEST;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.BAD_REQUEST,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Verificação explícita para BadRequestError
    if (exception instanceof MethodArgumentNotValidError) {
      this.logger.error(
        'MethodArgumentNotValidError validation error detected',
      ); // Logando o erro de Zod

      status = HttpStatus.BAD_REQUEST;
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.INTEGRITY_VIOLATION,
        message: exception.message || 'Unexpected error',
        path: request.url,
      };

      return response.status(status).json(standardError);
    }

    // Logando o erro no console para depuração
    this.logger.error(exception.stack || exception.message);

    // Retornando a resposta com o erro processado
    response.status(status).json(error);
  }
}
