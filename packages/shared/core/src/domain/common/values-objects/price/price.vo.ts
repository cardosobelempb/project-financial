import { BadRequestError } from '../../errors'
import { messages } from '../locales/locales'

type SupportedLang = 'pt' | 'en'
type PriceOptions = {
  lang?: SupportedLang
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export class PriceVO {
  private readonly value: number
  private readonly currency: string

  private constructor(value: number, currency: string) {
    this.value = value
    this.currency = currency
  }

  public static create(
    input: string | number,
    options: PriceOptions = { lang: 'en', currency: 'USD' },
  ): PriceVO {
    const { lang = 'en', currency = 'USD' } = options
    const msg = messages[lang]

    if (!PriceVO.isCurrencySupported(currency)) {
      throw new BadRequestError(
        msg.PRICE_UNSUPPORTED_CURRENCY?.replace('{currency}', currency) ??
          `Unsupported currency: ${currency}`,
      )
    }

    if (input === null || input === undefined || input === '') {
      throw new BadRequestError(msg.EMPTY)
    }

    let numericValue: number

    if (typeof input === 'string') {
      const cleaned = input.replace(/[^\d,.-]/g, '').replace(',', '.')
      numericValue = parseFloat(cleaned)
    } else {
      numericValue = input
    }

    if (isNaN(numericValue)) {
      throw new BadRequestError(msg.PRICE_INVALID)
    }

    if (numericValue < 0) {
      throw new BadRequestError(msg.PRICE_NEGATIVE)
    }

    return new PriceVO(numericValue, currency)
  }

  public getValue(): number {
    return this.value
  }

  public format(options: PriceOptions = {}): string {
    const {
      lang = 'en',
      currency = this.currency,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(this.value)
  }

  public toString(): string {
    return this.format()
  }

  private static isCurrencySupported(currency: string): boolean {
    try {
      new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(1)
      return true
    } catch {
      return false
    }
  }
}
