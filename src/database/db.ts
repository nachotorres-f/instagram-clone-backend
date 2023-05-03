import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('instagram_clone', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
