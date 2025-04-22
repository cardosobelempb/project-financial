export class Email {
  constructor(readonly value: string) {
    if (!Email.isValid(value)) {
      throw new Error('email.invalid');
    }
  }

  toString() {
    return this.value.toLocaleLowerCase();
  }

  toValue() {
    return this.value;
  }

  /**
   * Valida se uma string é um e-mail.
   */
  static isValid(email: string): boolean {
    const pattern = /^[a-z0-9_.\-]+@[a-z0-9_.\-]+\.[a-z]{2,}$/i;
    return pattern.test(email);
  }
}

const email = new Email("CLAUDio.c.lima@hotmail.com")

console.log(email.toString())
console.log(email.toValue())
