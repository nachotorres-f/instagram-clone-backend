import express from 'express';
import { router } from './routes';
import { config } from './utils/config';
import './database';

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
