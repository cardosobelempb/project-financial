export class EntityNotFoundError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 404 } })
  }
}
