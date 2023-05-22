import { Dialect } from 'sequelize';

declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL: string;
    EMAIL_PASSWORD: string;
    EMAIL_SERVICE: string;

    PORT: number;

    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DIALECT: Dialect;
    DB_HOST: string;

    HASH_SALT: number;
  }
}

export {};
