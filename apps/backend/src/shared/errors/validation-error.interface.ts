import { StandardError } from './standard-error.interface'

export interface ValidationError extends StandardError {
  errors?: { field: string; message: string }[]
}
