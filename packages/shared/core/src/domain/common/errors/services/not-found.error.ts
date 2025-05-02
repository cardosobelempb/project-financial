export class NotFoundError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 404 } })
  }
}
