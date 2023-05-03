import { sequelize } from './db';

export const authenticateConnection = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      sequelize.close();
    })
    .catch((error) => {
      console.log('Error database connection', error);
    });
};
