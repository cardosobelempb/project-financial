export class ConflictError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 409 } })
  }
}
