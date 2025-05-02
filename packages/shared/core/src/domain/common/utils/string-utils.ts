export class StringUtils {
  private constructor() {}

  static isBlank(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0
  }

  static isNotBlank(value: string | null | undefined): boolean {
    return !this.isBlank(value)
  }

  static capitalize(value: string): string {
    if (this.isBlank(value)) return value
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  static removeAccents(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  static toSlug(value: string): string {
    return this.removeAccents(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  static truncate(value: string, maxLength: number): string {
    if (!value || value.length <= maxLength) return value
    return value.substring(0, maxLength).trimEnd() + '...'
  }

  static countOccurrences(text: string, search: string): number {
    if (this.isBlank(text) || this.isBlank(search)) return 0
    return (text.match(new RegExp(search, 'g')) || []).length
  }

  static reverse(value: string): string {
    return value.split('').reverse().join('')
  }

  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  static isValidURL(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) sum += +cpf.charAt(i) * (10 - i)
    let rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== +cpf.charAt(9)) return false

    sum = 0
    for (let i = 0; i < 10; i++) sum += +cpf.charAt(i) * (11 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0

    return rest === +cpf.charAt(10)
  }

  static isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

    const calcCheckDigit = (base: string, factors: number[]) =>
      factors.reduce(
        (sum, factor, index) => sum + +base.charAt(index) * factor,
        0,
      )

    const base = cnpj.slice(0, 12)
    const digit1 =
      calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11
    const check1 = digit1 < 2 ? 0 : 11 - digit1

    const base2 = base + check1
    const digit2 =
      calcCheckDigit(base2, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11
    const check2 = digit2 < 2 ? 0 : 11 - digit2

    return cnpj.endsWith(`${check1}${check2}`)
  }

  static toCamelCase(value: string): string {
    return value
      .replace(/[-_]+/g, ' ')
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '')
  }

  static toSnakeCase(value: string): string {
    return value
      .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      .replace(/[\s\-]+/g, '_')
      .toLowerCase()
  }

  static toKebabCase(value: string): string {
    return value
      .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  static generateRandomString(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  static getInitials(name: string): string {
    return name
      .trim() // Remove espaços extras nas extremidades
      .split(/\s+/) // Divide por qualquer espaço em branco
      .map(word => word[0]?.toUpperCase()) // Pega a primeira letra de cada palavra, em minúsculo
      .join('') // Junta as letras
  }
}
