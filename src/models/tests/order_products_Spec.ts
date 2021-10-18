import { OrderStore } from '../orders';
import { UserStore } from '../user';
import { ProductStore } from '../products';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

const userStore = new UserStore();

const productStore = new ProductStore();

const request = supertest(app);

const { SPEC_TEST_PASSWORD } = process.env;

describe('Order Model', () => {
  let token: string;
  beforeAll(async () => {
    await userStore.create({
      username: 'test_user',
      password: SPEC_TEST_PASSWORD as string,
    });
    await productStore.create({
      title: 'Test Book',
      description: 'Test description that defines the test book.',
      price: '10.00',
    });
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });

  it('create method adds order', async () => {
    const res = await store.create({
      user_id: '1',
      order_status: 'active',
    });
    expect(res.id).toBe(1);
  });
  describe('Tests order products endpoint', () => {
    it('POST:Test should create an order', async () => {
      const resp = await request
        .post('/orders')
        .send({ user_id: '1' })
        .set('Accepted', 'application/json');
      expect(resp.body).toEqual({
        id: 2,
        order_status: 'active',
        user_id: '1',
      });
    });
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
      .send({ id: 2, order_status: 'sucessful', user_id: '1' })
      .set('Accepted', 'application/json');
    expect(resp.body).toEqual({
      id: 2,
      order_status: 'sucessful',
      user_id: '1',
    });
  });
  it('POST: Tests endpoint for products with expected fail', async () => {
    const resp = await request
      .post('/orders/2/products')
      .send({ order_id: '5', product_id: '1', quantiy: 1 })
      .set('Accepted', 'application/json');
    expect(resp.status).toBe(400);
  });
  it('DELETE: Tests deletion of order', async () => {
    const resp = await request.delete('/orders/2');
    expect(resp.status).toBe(200);
  });
  it('index method should return orders', async () => {
    const resp = await store.index();
    expect(resp).toEqual([
      {
        id: 1,
        user_id: '1',
        order_status: 'active',
      },
    ]);
  });
  describe('Tests orders by user', () => {
    let token: string;
    it('AUTHENTICATE: Gives users authentication', async () => {
      const resp = await request
        .post('/users/authenticate')
        .send({
          username: 'test_user',
          password: `${SPEC_TEST_PASSWORD}` as string,
        })
        .set('Accepted', 'application/json');
      token = 'Bearer ' + resp.body;
    });
    it('POST: Retrieves orders by user id', async () => {
      const resp = await request.get('/orders/1').set('Authorization', token);
      expect(resp.status).toEqual(200);
    });
  });
  it('delete method should delete the order', async () => {
    await store.delete(1);
    const res = await store.index();
    expect(res).toEqual([]);
  });
});
