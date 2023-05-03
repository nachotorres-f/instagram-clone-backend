import express from 'express';
import { authenticateConnection } from './database/authenticateConnection';

const app = express();
const port = 3000;

authenticateConnection();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
