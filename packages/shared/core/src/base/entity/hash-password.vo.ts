export class HashPassword {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error("hash-password.is-empty");
    }

    if (!HashPassword.isValid(value)) {
      throw new Error("hash-password.invalid");
    }
  }
  static isValid(value: string): boolean {
    const regex = /^\$2[ayb]\$.{56}$/;
    return regex.test(value);
  }
}
