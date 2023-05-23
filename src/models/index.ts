import { config } from '../utils/config';
import { Sequelize } from 'sequelize';

const env = config.NODE_ENV;

const sequelizeConfig = {
  development: {
    name: config.DB_DEV_NAME,
    user: config.DB_DEV_USER,
    pass: config.DB_DEV_PASSWORD,
    host: config.DB_DEV_HOST,
    dialect: config.DB_DEV_DIALECT,
  },
  test: {
    name: config.DB_TEST_NAME,
    user: config.DB_TEST_USER,
    pass: config.DB_TEST_PASSWORD,
    host: config.DB_TEST_HOST,
    dialect: config.DB_TEST_DIALECT,
  },
  production: {
    name: config.DB_PROD_NAME,
    user: config.DB_PROD_USER,
    pass: config.DB_PROD_PASSWORD,
    host: config.DB_PROD_HOST,
    dialect: config.DB_PROD_DIALECT,
  },
};

export const sequelize = new Sequelize(
  sequelizeConfig[env].name,
  sequelizeConfig[env].user,
  sequelizeConfig[env].pass,
  {
    host: sequelizeConfig[env].host,
    dialect: sequelizeConfig[env].dialect,
  }
);

if (env === 'development') {
  sequelize.sync({ alter: true });
}
