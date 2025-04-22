export class Cpf {
  constructor(readonly value: string) {
    if (!Cpf.isValid(value)) {
      throw new Error('cpf.invalid');
    }
   }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }
  
  /**
   * Valida um CPF.
   */
  static isValid(cpf: string): boolean {
    const data = cpf.replace(/\D/g, "");

    if (data.length !== 11 || /^(\d)\1{10}$/.test(data)) {
      return false;
    }

    let digitoA = 0;
    let digitoB = 0;

    for (let i = 0, x = 10; i < 9; i++, x--) {
      digitoA += parseInt(data.charAt(i)) * x;
    }

    for (let i = 0, x = 11; i < 10; i++, x--) {
      digitoB += parseInt(data.charAt(i)) * x;
    }

    const somaA = digitoA % 11 < 2 ? 0 : 11 - (digitoA % 11);
    const somaB = digitoB % 11 < 2 ? 0 : 11 - (digitoB % 11);

    return (
      somaA === parseInt(data.charAt(9)) && somaB === parseInt(data.charAt(10))
    );
  }
}