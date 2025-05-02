export type AuthCredentials = {
  username?: string;
  email?: string;
  password: string;
  [key: string]: any; // Para suportar autenticações personalizadas (OAuth, etc)
};

export type AuthResult = {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
};

export abstract class Auth {
  /**
   * Autentica um usuário com base nas credenciais.
   */
  abstract login(credentials: AuthCredentials): Promise<AuthResult>;

  /**
   * Realiza logout do usuário atual.
   */
  abstract logout(): Promise<void>;

  /**
   * Verifica se há um usuário autenticado.
   */
  abstract isAuthenticated(): Promise<boolean>;

  /**
   * Retorna os dados do usuário autenticado, se houver.
   */
  abstract getCurrentUser(): Promise<any>;

  /**
   * Atualiza o token de acesso, se aplicável.
   */
  abstract refreshToken?(): Promise<string | null>;
}
