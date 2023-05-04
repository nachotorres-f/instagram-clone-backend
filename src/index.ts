import express from 'express';
import { router } from './routes';
import './database';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
