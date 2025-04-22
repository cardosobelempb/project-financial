export abstract class Chars {
  constructor(
    readonly value: string,
    readonly limit: number,
    readonly suffix: string,

  ) { 
    this.value = value ?? Chars.limitChars(value, limit, suffix)
  }
  
  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }
   /**
   * Limita uma string a uma quantidade de caracteres, com corte opcional por ocorrência.
   */
  static limitChars(
    value: string,
    limit: number,
    suffix: string = "...",
    occurrence: string = ""
  ): string {
    value = value.trim();
    if (value.length <= limit) {
      return value;
    }

    if (occurrence) {
      const cut = value.lastIndexOf(occurrence, limit);
      return value.substring(0, cut !== -1 ? cut : limit) + suffix;
    }

    return value.substring(0, limit) + suffix;
  }
}