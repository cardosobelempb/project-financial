import { IServiceError } from "./service-error.interface";

export class ConflictError extends Error implements IServiceError {
  constructor(message: string) {
    super(message, { cause: { statusCode: 409 } })
  }
}
