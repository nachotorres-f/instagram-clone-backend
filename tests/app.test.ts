import supertest from 'supertest';
import { app } from '../src/app';

describe('Test index App', () => {
  test('Catch index route', async () => {
    const res = await supertest(app).get('/');
    expect(res.status).toEqual(404);
  });
});
