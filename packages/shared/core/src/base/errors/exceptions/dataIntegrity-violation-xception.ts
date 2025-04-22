export class DataIntegrityViolationException extends Error {
  name = "AppDataIntegrityViolationException";

  constructor(message: string) {
    super(message);
  }
}
