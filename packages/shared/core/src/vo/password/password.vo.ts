// import { BcryptHashing } from "../../base/abstract/bcrypt-hashing.abstract"; // Assumindo que você tem um BcryptHasher

import { BadRequestError } from "../../base";

interface PasswordOptions {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireDigit?: boolean;
  requireSpecialChar?: boolean;
}

export class PasswordVO {
  private readonly value: string;
  // private readonly bcrypt: BcryptHashing;

  constructor(password: string, options: PasswordOptions = {}) {
    const {
      minLength = 8,
      maxLength = 64,
      requireUppercase = true,
      requireLowercase = true,
      requireDigit = true,
      requireSpecialChar = true,
    } = options;

    this.validate(password, {
      minLength,
      maxLength,
      requireUppercase,
      requireLowercase,
      requireDigit,
      requireSpecialChar,
    });

    this.value = password;
    // this.bcrypt = new BcryptHasher(); // Criando instância do BcryptHasher
  }

  private validate(password: string, options: Required<PasswordOptions>): void {
    const {
      minLength,
      maxLength,
      requireUppercase,
      requireLowercase,
      requireDigit,
      requireSpecialChar,
    } = options;

    if (!password || password.trim().length === 0) {
      throw new BadRequestError("Password cannot be empty.");
    }

    if (password.length < minLength) {
      throw new BadRequestError(`Password must be at least ${minLength} characters.`);
    }

    if (password.length > maxLength) {
      throw new BadRequestError(`Password must be at most ${maxLength} characters.`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      throw new BadRequestError("Password must include at least one uppercase letter.");
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
      throw new BadRequestError("Password must include at least one lowercase letter.");
    }

    if (requireDigit && !/\d/.test(password)) {
      throw new BadRequestError("Password must include at least one number.");
    }

    if (
      requireSpecialChar &&
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=~`]/.test(password)
    ) {
      throw new BadRequestError("Password must include at least one special character.");
    }
  }

  // Método para gerar o hash da senha
  /*public async hashPassword(saltRounds: number = 10): Promise<string> {
    const salt = await this.bcrypt.genSaltSync(saltRounds); // Gerando o salt
    return this.bcrypt.hashSync(this.value, salt); // Gerando o hash da senha
  }*/

  // Método para verificar se a senha fornecida corresponde ao hash
  /*public async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return this.bcrypt.compare(password, hash); // Comparando a senha com o hash fornecido
  }*/

  // Método para validar se um hash é válido
  /*public async isValidHash(hash: string): Promise<boolean> {
    // Verificar se o hash é válido comparando com o próprio hash gerado
    const generatedHash = await this.hashPassword();
    return this.bcrypt.compare(this.value, hash); // Comparando o hash gerado com o hash fornecido
  }*/

  public getValue(): string {
    return this.value;
  }
}
