export class UnprocessableEntityError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 422 } })
  }
}
