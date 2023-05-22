import request from 'supertest';
import { app } from '../src/app';

jest.useFakeTimers();

describe('Test index App', () => {
  test('Catch index route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(404);
  });
});
