// db.config.ts

export type Environment = "development" | "production";

export interface DBConfig {
  host: string;
  port: number;
  database: string;
  charset: string;
  username: string;
  password: string;
  ssl?: boolean;
  application_name?: string;
}

export interface DBConnections {
  development: DBConfig;
  production: DBConfig;
}

export interface DatabaseConfig {
  environment: Environment;
  connections: DBConnections;
}

// Simula a função PHP `environment('environment')` com fallback
const currentEnv: Environment =
  (process.env.NODE_ENV as Environment) || "development";

export const dbConfig: DatabaseConfig = {
  environment: currentEnv,

  connections: {
    development: {
      host: "localhost",
      port: 5432,
      database: "myframe",
      charset: "utf8",
      username: "postgres",
      password: "postgres", // Altere conforme necessário
      ssl: false,
      application_name: "DevApp",
    },
    production: {
      host: "localhost",
      port: 5432,
      database: "grupo_pg",
      charset: "utf8",
      username: "postgres",
      password: "senhaSegura",
      ssl: true,
      application_name: "ProdApp",
    },
  },
};
