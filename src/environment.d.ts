declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL: string;
      EMAIL_PASSWORD: string;
      EMAIL_SERVICE: string;

      PORT: number;

      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DIALECT: Dialect;

      HASH_SALT: number;
    }
  }
}

export {};
