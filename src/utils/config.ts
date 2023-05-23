import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface ENV {
  EMAIL: string | undefined;
  EMAIL_PASSWORD: string | undefined;
  EMAIL_SERVICE: string | undefined;

  NODE_ENV: string | undefined;
  PORT: number | undefined;

  DB_DEV_NAME: string | undefined;
  DB_DEV_USER: string | undefined;
  DB_DEV_PASSWORD: string | undefined;
  DB_DEV_DIALECT: string | undefined;
  DB_DEV_HOST: string | undefined;

  DB_TEST_NAME: string | undefined;
  DB_TEST_USER: string | undefined;
  DB_TEST_PASSWORD: string | undefined;
  DB_TEST_DIALECT: string | undefined;
  DB_TEST_HOST: string | undefined;

  DB_PROD_NAME: string | undefined;
  DB_PROD_USER: string | undefined;
  DB_PROD_PASSWORD: string | undefined;
  DB_PROD_DIALECT: string | undefined;
  DB_PROD_HOST: string | undefined;

  HASH_SALT: number | undefined;
}

interface Config {
  EMAIL: string;
  EMAIL_PASSWORD: string;
  EMAIL_SERVICE: string;

  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;

  DB_DEV_NAME: string;
  DB_DEV_USER: string;
  DB_DEV_PASSWORD: string;
  DB_DEV_DIALECT: Dialect;
  DB_DEV_HOST: string;

  DB_TEST_NAME: string;
  DB_TEST_USER: string;
  DB_TEST_PASSWORD: string;
  DB_TEST_DIALECT: Dialect;
  DB_TEST_HOST: string;

  DB_PROD_NAME: string;
  DB_PROD_USER: string;
  DB_PROD_PASSWORD: string;
  DB_PROD_DIALECT: Dialect;
  DB_PROD_HOST: string;

  HASH_SALT: number;
}

const getConfig = (): ENV => {
  return {
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,

    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),

    DB_DEV_NAME: process.env.DB_DEV_NAME,
    DB_DEV_USER: process.env.DB_DEV_USER,
    DB_DEV_PASSWORD: process.env.DB_DEV_PASSWORD,
    DB_DEV_DIALECT: process.env.DB_DEV_DIALECT,
    DB_DEV_HOST: process.env.DB_DEV_HOST,

    DB_TEST_NAME: process.env.DB_TEST_NAME,
    DB_TEST_USER: process.env.DB_TEST_USER,
    DB_TEST_PASSWORD: process.env.DB_TEST_PASSWORD,
    DB_TEST_DIALECT: process.env.DB_TEST_DIALECT,
    DB_TEST_HOST: process.env.DB_TEST_HOST,

    DB_PROD_NAME: process.env.DB_PROD_NAME,
    DB_PROD_USER: process.env.DB_PROD_USER,
    DB_PROD_PASSWORD: process.env.DB_PROD_PASSWORD,
    DB_PROD_DIALECT: process.env.DB_PROD_DIALECT,
    DB_PROD_HOST: process.env.DB_PROD_HOST,

    HASH_SALT: Number(process.env.HASH_SALT),
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }

  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export { sanitizedConfig as config };
