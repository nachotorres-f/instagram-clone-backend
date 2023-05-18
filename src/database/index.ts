import './models';
import { sequelize } from './db';

sequelize
  .authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .catch((error) => console.log('Error connection database', error));
