import supertest from 'supertest';
import app from '../../../server';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

const { SPEC_TEST_PASSWORD } = process.env;

describe('Tests order products endpoint', () => {
  let token: string;
  it('POST:Test should create an order', async () => {
    const resp = await request
      .post('/orders')
      .send({ user_id: '1' })
      .set('Accepted', 'application/json');
    expect(resp.body).toEqual({ id: 2, status: 'active', user_id: '1' });
  });
  it('GET: Tests Retrieves orders endpoint', async () => {
    const resp = await request.get('/orders');
    expect(resp.body.length).toBe(2);
  });
  it('GET: Tests Retrieves orders endpoint for specific order', async () => {
    const resp = await request.get('/orders/2');
    expect(resp.status).toBe(200);
  });

  it('PUT: Tests update of orders endpoint', async () => {
    const resp = await request
      .put('/orders/2')
      .send({ id: 2, status: 'complete', user_id: '1' })
      .set('Accepted', 'application/json');
    expect(resp.body.status).toBe('complete');
  });
  it('DELETE: Tests deletion of order', async () => {
    const resp = await request.delete('/orders/2');
    expect(resp.status).toBe(200);
  });
  it('AUTHENTICATE: Tests endpoints for authorized users', async () => {
    const resp = await request
      .post('/users/authenticate')
      .send({ username: 'test_user', password: SPEC_TEST_PASSWORD as string })
      .set('Accepted', 'application/json');
    token = 'Bearer' + resp.body;
  });
  it('POST: Tests endpoint for user order', async () => {
    const resp = await request
      .post('/orders/users/1')
      .set('Authorization', token);
    expect(resp.status).toBe(200);
  });
});
