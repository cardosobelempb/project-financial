export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 401 } })
  }
}
