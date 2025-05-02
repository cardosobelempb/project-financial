export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 403 } })
  }
}
