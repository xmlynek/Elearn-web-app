declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        DATABASE_URL: string;
        JWT_ACCESS_TOKEN_SECRET: string;
        JWT_ACCESS_TOKEN_EXPIRATION: string;
        JWT_REFRESH_TOKEN_SECRET: string;
        JWT_REFRESH_TOKEN_EXPIRATION: string;
        JWT_PASSWORD_RESET_TOKEN_SECRET: string;
        JWT_PASSWORD_RESET_TOKEN_EXPIRATION: string;
        MAILTRAP_HOST?: string;
        MAILTRAP_PORT?: string;
        MAILTRAP_USERNAME?: string;
        MAILTRAP_PASSWORD: string;
        EMAIL_HOST?: string;
        EMAIL_PORT?: string;
        EMAIL_USERNAME?: string;
        EMAIL_PASSWORD: string;
      }
    }
  }

  export {}