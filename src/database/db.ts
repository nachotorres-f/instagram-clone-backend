import { config } from '../utils/config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  }
);
