export class StrongPassword {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error("strong-password.is-empty");
    }

    if (!StrongPassword.isValid(value)) {
      throw new Error("strong-password.too-weak");
    }
  }

  static isValid(value: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value);
  }
}
