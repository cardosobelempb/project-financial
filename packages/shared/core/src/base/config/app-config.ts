export interface AppConfig {
  app_name: string;
  app_key: string;
  app_time_blocked: number;
  recover_token_in: number;
  app_time_zone: string;
}

export const config: AppConfig = {
  app_name: "Grupo ++PHP",
  app_key: "048a230420609122de682e1af0b75474",
  app_time_blocked: 59,
  recover_token_in: 2,
  app_time_zone: "America/Sao_Paulo",
};
