// error-handlers.ts
import { HttpStatus } from '@nestjs/common';

import { StandardError } from './standard-error.interface';
import { ValidationError } from './validation-error.interface';
import { Request } from 'express';
import { ErrorConstants } from '@shared/core';

export const errorHandlers = {
  ResourceNotFoundError: (error: any, request: Request): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.NOT_FOUND,
    error: ErrorConstants.NOT_FOUND,
    message: error.message,
    path: request.url,
  }),

  EntityNotFoundError: (error: any, request: Request): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.NOT_FOUND,
    error: ErrorConstants.ENTITY_NOT_FOUND,
    message: error.message,
    path: request.url,
  }),

  DataIntegrityViolationError: (
    error: any,
    request: Request,
  ): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.BAD_REQUEST,
    error: ErrorConstants.DATA_INTEGRITY_VIOLATION,
    message: error.message,
    path: request.url,
  }),

  BadRequestError: (error: any, request: Request): ValidationError => {
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const errors = Array.isArray(error.response?.message)
      ? error.response.message.map((msg: string) => {
          const [field, ...rest] = msg.split(':');
          return {
            field: field.trim(),
            message: rest.join(':').trim(),
          };
        })
      : [];

    return {
      timestamp: new Date().toISOString(),
      status,
      error: ErrorConstants.VALIDATION_ERROR,
      message: error.message,
      path: request.url,
      errors,
    };
  },
};
