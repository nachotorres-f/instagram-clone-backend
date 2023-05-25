import { app } from '../../src/app';
import { sequelize } from '../../src/models';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';

describe('Test of test', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  const username = faker.internet.userName();
  const email = faker.internet.email();

  it('Get all Users', async () => {
    const response = await supertest(app).get('/api/user');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Get all Users Error', async () => {
    const response = await supertest(app).get('/api/user');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Create one User', async () => {
    const response = await supertest(app).post('/api/user').send({
      username,
      email,
      password: faker.internet.password(),
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
  });

  it('Create one User with an username already exist', async () => {
    const response = await supertest(app).post('/api/user').send({
      username,
      email,
      password: faker.internet.password(),
    });

    expect(response.status).toBe(500);
    expect(response.body).toBeTruthy();
  });

  it('Get all Users after the create users', async () => {
    const response = await supertest(app).get('/api/user');

    expect(response.body.length).toBe(1);
    expect(response.body).toEqual([
      {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
      },
    ]);
  });

  it('Get One User', async () => {
    const response = await supertest(app).get('/api/user/1');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
    });
  });

  it('Update User', async () => {
    const response = await supertest(app).put('/api/user/1').send({
      username: faker.internet.userName(),
      email: faker.internet.email(),
    });

    expect(response.status).toEqual(200);
    expect(response.body).not.toEqual({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
    });
  });

  it('Active User Wrong', async () => {
    const response = await supertest(app).put('/api/user/active/1');

    expect(response.status).toEqual(500);
  });

  it('Active User Wrong', async () => {
    const response = await supertest(app)
      .put('/api/user/active/1')
      .send({ codeActivation: 111111 });

    expect(response.status).toEqual(200);
  });

  it('Delete User', async () => {
    const response = await supertest(app).delete('/api/user/1');

    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    sequelize.close();
  });
});
