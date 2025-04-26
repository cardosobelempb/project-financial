export class Email {
  constructor(readonly value: string) {
    if (!Email.isMail(value)) {
      throw new Error("email.invalid");
    }
  }

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  public equals(email: Email) {
    return email.toValue() === this.value;
  }

  static isMail(email: string): boolean {
    const pattern = /^[a-z0-9_.\-]+@[a-z0-9_.\-]+\.[a-z]{2,}$/i;
    return pattern.test(email);
  }
}
