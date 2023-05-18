import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes';
import './database';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(process.env.port, () => {
  console.log(`App listening on port ${process.env.port}`);
});
