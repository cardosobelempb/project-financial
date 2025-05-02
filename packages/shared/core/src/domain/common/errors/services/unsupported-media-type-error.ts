export class UnsupportedMediaTypeError extends Error {
  constructor(message: string) {
    super(message, { cause: { statusCode: 415 } })
  }
}
