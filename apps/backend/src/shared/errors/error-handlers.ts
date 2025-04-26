// error-handlers.ts
import { HttpStatus } from '@nestjs/common'
import { ErrorConstants } from '@shared/core'
import { Request } from 'express'

import { StandardError, ValidationError } from './error.interfaces'

type errors =
  | {
      field: string
      message: string
    }[]
  | undefined

export const errorHandlers = {
  ResourceNotFoundError: (error: Error, request: Request): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.NOT_FOUND,
    error: ErrorConstants.NOT_FOUND,
    message: error.message,
    path: request.url,
  }),

  EntityNotFoundError: (error: Error, request: Request): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.NOT_FOUND,
    error: ErrorConstants.ENTITY_NOT_FOUND,
    message: error.message,
    path: request.url,
  }),

  DataIntegrityViolationError: (
    error: Error,
    request: Request,
  ): StandardError => ({
    timestamp: new Date().toISOString(),
    status: HttpStatus.BAD_REQUEST,
    error: ErrorConstants.DATA_INTEGRITY_VIOLATION,
    message: error.message,
    path: request.url,
  }),

  BadRequestError: (
    error: Error & { response?: { message?: string[] } },
    request: Request,
  ): ValidationError => {
    const status = HttpStatus.UNPROCESSABLE_ENTITY
    const errors: errors = Array.isArray(error.response?.message)
      ? error.response.message.map((msg: string) => {
          const [field, ...rest] = msg.split(':')
          return {
            field: field.trim(),
            message: rest.join(':').trim(),
          }
        })
      : []

    return {
      timestamp: new Date().toISOString(),
      status,
      error: ErrorConstants.INTEGRITY_VIOLATION,
      message: error.message,
      path: request.url,
      errors,
    }
  },
}
