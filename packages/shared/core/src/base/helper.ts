export class Helpers {
  /**
   * Valida um CPF.
   */
  static CPF(cpf: string): boolean {
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

  /**
   * Limita uma string a uma quantidade de caracteres, com corte opcional por ocorrência.
   */
  static limitChars(
    str: string,
    limit: number,
    suffix: string = "...",
    occurrence: string = ""
  ): string {
    str = str.trim();
    if (str.length <= limit) {
      return str;
    }

    if (occurrence) {
      const cut = str.lastIndexOf(occurrence, limit);
      return str.substring(0, cut !== -1 ? cut : limit) + suffix;
    }

    return str.substring(0, limit) + suffix;
  }

  /**
   * Gera um slug a partir de uma string.
   */
  static slug(str: string): string {
    const from =
      "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýýþÿŔŕ";
    const to =
      "AAAAAAACEEEEIIIINOOOOOOUUUUYBsaaaaaaaceeeeiiiionoooooouuuuyybbyRr";

    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents
    str = str.replace(new RegExp(`[${from}]`, "g"), (match) => {
      const index = from.indexOf(match);
      return to.charAt(index) || "-";
    });

    str = str.replace(/[^a-zA-Z0-9]+/g, "-");
    str = str.replace(/^-+|-+$/g, "");
    return str.toLowerCase();
  }

  /**
   * Valida se uma string é um e-mail.
   */
  static isMail(email: string): boolean {
    const pattern = /^[a-z0-9_.\-]+@[a-z0-9_.\-]+\.[a-z]{2,}$/i;
    return pattern.test(email);
  }
}
