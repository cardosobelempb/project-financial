export class ResourceNotFoundException extends Error {
  name = "ResourceNotFoundException";

  constructor(message: string) {
    super(message);
  }
}
