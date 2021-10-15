import supertest from 'supertest';
import app from '../../../server';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

const request = supertest(app);
const { SPEC_TEST_PASSWORD } = process.env;

describe('POST: Test user endpoint', () => {
  let token: string;
  it('POST: Test should create a user', async () => {
    const resp = await request
      .post('/users')
      .send({ username: 'test_user', password: SPEC_TEST_PASSWORD as string })
      .set('Accepted', 'application/json');
    token = 'Bearer' + resp.body;
    expect(resp.status).toBe(200);
  });
  it('POST: Tests endpoint to get the user', async () => {
    const resp = await request.post('/users/2').set('Authorization', token);
    expect(resp.body.username).toEqual('test_user');
  });
  it('PUT: Tests endpiont to update the user', async () => {
    const resp = await request
      .put('/users/2')
      .set('Authorization', token)
      .send({ username: 'test_user2', password: SPEC_TEST_PASSWORD as string })
      .set('Accepted', 'application/json');
    expect(resp.status).toBe(200);
  });
  it('AUTHENTICATE: Tests authorization of user', async () => {
    const resp = await request
      .post('/users/authenticate')
      .send({ username: 'test_user2', password: SPEC_TEST_PASSWORD as string })
      .set('Accepted', 'application/json');
    expect(resp.status).toBe(200);
  });
  it('DELETE: Tests deletion of user', async () => {
    const resp = await request
      .delete('/users/2')
      .set('Authorization', token)
      .set('Accepted', 'application/json');
    expect(resp.status).toBe(200);
  });
});
