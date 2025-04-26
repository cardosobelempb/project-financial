export const envService = {
  NODE_ENV: 'development',
  APP_NAME: 'My App',
  APP_VERSION: '1.0.0',
  APP_URL: 'http://localhost:3000',
  APP_HOST: 'localhost',
  PREFIX_URL: '/api',
  DATABASE_URL: 'postgres://user:password@localhost:5432/mydb',
  JWT_PRIVATE_KEY: 'your_jwt_private_key',
  JWT_PUBLIC_KEY: 'your_jwt_public_key',
  CLOUDFLARE_ACCOUNT_ID: 'your_cloudflare_account_id',
  AWS_BUCKET_NAME: 'your_aws_bucket_name',
  AWS_ACCESS_KEY_ID: 'your_aws_access_key_id',
  AWS_SECRET_ACCESS_KEY: 'your_aws_secret_access_key',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_DB: 0,
  APP_PORT: 3333,
};

export type TypeEnvService = typeof envService;
