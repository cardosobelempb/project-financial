export class Slug{
  constructor(readonly value: string) { 
    this.value = value ?? Slug.slug(value)
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
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
}
