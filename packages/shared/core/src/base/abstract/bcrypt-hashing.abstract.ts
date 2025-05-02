export abstract class BcryptHashing {
  abstract compare(plain: string, hash: string): Promise<boolean>;
  abstract hashSync(plain: string, hash: string): Promise<string>;
  abstract hash(plain: string): Promise<string>;
  abstract verifyPassword(password: string, hash: string): Promise<boolean>;
  abstract generateSalt(saltRounds: number): string;
  abstract genSaltSync(saltRounds: number): Promise<string>;
}
