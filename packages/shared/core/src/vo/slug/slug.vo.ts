import { BadRequestError } from "../../base";

type SlugOptions = {
  locale?: "pt" | "en";
  maxLength?: number;
};

const charMaps: Record<string, Record<string, string>> = {
  de: { ä: "ae", ö: "oe", ü: "ue", ß: "ss" },
  fr: { œ: "oe", æ: "ae", ç: "c" },
  pt: { ã: "a", õ: "o", ç: "c" },
  es: { ñ: "n" },
  // Adicione mais idiomas conforme necessário
};

export class SlugVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): SlugVO {
    if (!SlugVO.isValidSlug(value)) {
      throw new BadRequestError("Invalid slug format.");
    }
    return new SlugVO(value);
  }

  static createFromText(text: string, options?: SlugOptions): SlugVO {
    const locale = options?.locale || "en";
    const maxLength = options?.maxLength || 100;

    let processed = SlugVO.applyLocaleMap(text, locale)
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "")
      .substring(0, maxLength);

    if (!SlugVO.isValidSlug(processed)) {
      throw new BadRequestError("Generated slug is invalid.");
    }

    return new SlugVO(processed);
  }

  private static applyLocaleMap(text: string, locale: string): string {
    const map = charMaps[locale];
    if (!map) return text;

    return text
      .split("")
      .map((char) => map[char] || char)
      .join("");
  }

  static isValidSlug(value: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return value.length >= 3 && value.length <= 100 && slugRegex.test(value);
  }

  public getValue(): string {
    return this.value;
  }
}


const slug = SlugVO.createFromText('console.log brbrasil pt portugues')
console.log(slug.getValue())
