import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface ENV {
  EMAIL: string | undefined;
  EMAIL_PASSWORD: string | undefined;
  EMAIL_SERVICE: string | undefined;

  PORT: number | undefined;

  DB_NAME: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_DIALECT: string | undefined;
  DB_HOST: string | undefined;

  HASH_SALT: number | undefined;
}

interface Config {
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

const getConfig = (): ENV => {
  return {
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,

    PORT: Number(process.env.PORT),

    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,

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
