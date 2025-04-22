export abstract class Words {

  constructor(
    readonly value: string,
    readonly limit: number,
    readonly suffix: string,
  ) {
    this.value = value ?? Words.limitWords(value, limit, suffix)
  }

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }
   /**
   * Limita uma string a uma quantidade de palavras.
   */
  static limitWords(
    str: string,
    limit: number,
    suffix: string = "..."
  ): string {
    const words = str.trim().split(/\s+/);
    return words.length > limit
      ? words.slice(0, limit).join(" ") + suffix
      : str;
  }
}

