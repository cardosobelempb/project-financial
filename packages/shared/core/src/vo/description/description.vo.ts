import { BadRequestError } from "../../base";
import { messages } from "../locales";

export class DescriptionVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string, lang: "pt" | "en" = "en"): DescriptionVO {
    const msg = messages[lang];

    if (!value || value.trim().length === 0) {
      throw new BadRequestError(msg.EMPTY);
    }

    if (value.length > 500) {
      throw new BadRequestError(msg.TOO_LONG);
    }

    return new DescriptionVO(value.trim());
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
