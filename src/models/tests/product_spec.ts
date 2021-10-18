import { ProductStore } from '../products';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

const { SPEC_TEST_PASSWORD } = process.env;

const store = new ProductStore();

describe('Product Model', () => {
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

  describe('Products endpoint testing', () => {
    let token: string;
    it('AUTHENTICATE: Tests user authentication', async () => {
      const resp = await request
        .post('/users/authenticate')
        .send({
          username: 'test_user',
          password: `${SPEC_TEST_PASSWORD}` as string,
        })
        .set('Accepted', 'application/json');
      token = 'Bearer ' + resp.body;
      expect(resp.status).toEqual(200);
    });
    it('POST: Test should create a product', async () => {
      const resp = await request
        .post('/products')
        .send({
          title: 'The Triagram Palms',
          description:
            'The palm fighting method of divine intention. Used by boxers in the Warring States Period.',
          price: '99.99',
        })
        .set('Accepted', 'application/json')
        .set('Authorization', token);
      expect(resp.body).toEqual({
        id: 2,
        title: 'The Triagram Palms',
        description:
          'The palm fighting method of divine intention. Used by boxers in the Warring States Period.',
        price: '99.99',
      });
    });
    it('GET:Tests endpoint to get products', async () => {
      const resp = await request.get('/products');
      expect(resp.body.length).toBe(2);
    });
    it('GET: Tests endpoint to get specific product', async () => {
      const resp = await request.get('/products/2');
      expect(resp.status).toBe(200);
    });
    it('PUT: Tests endpoint to update products', async () => {
      const resp = await request
        .put('/update/products/2')
        .send({
          title: 'The Triagram Palms(2nd Ed.)',
          description:
            'The palm fighting method of divine intention. Used by boxers in the Warring States Period.',
          price: '99.99',
        })
        .set('Accepted', 'application/json')
        .set('Authorization', token);
      expect(resp.body.title).toEqual('The Triagram Palms(2nd Ed.)');
    });
    it('DELETE: Tests endpoint to delete product', async () => {
      const resp = await request
        .delete('/delete/products/2')
        .set('Authorization', token)
        .set('Accepted', 'application/json');
      expect(resp.status).toBe(200);
    });
  });

  it('create method adds product', async () => {
    const res = await store.create({
      title: 'Iron Manacles',
      description: 'Methods of fighting with iron cuffs.',
      price: 54.99,
    });
    expect(res).toEqual({
      id: 3,
      title: 'Iron Manacles',
      description: 'Methods of fighting with iron cuffs.',
      price: '54.99',
    });
  });

  it('index method should return products', async () => {
    const res = await store.index();
    expect(res).toEqual([
      {
        id: 1,
        title: 'Test Book',
        description: 'Test description that defines the test book.',
        price: '10.00',
      },
      {
        id: 3,
        title: 'Iron Manacles',
        description: 'Methods of fighting with iron cuffs.',
        price: '54.99',
      },
    ]);
  });
  it('show method retrieves the product', async () => {
    const res = await store.show(1);
    expect(res.title).toBe('Test Book');
  });
  it('update method should update the product', async () => {
    const res = await store.update({
      id: 3,
      title: 'Iron Manacles(2nd Edition)',
      description: 'Methods of fighting with iron cuffs.',
      price: '54.99',
    });
    expect(res.title).toBe('Iron Manacles(2nd Edition)');
  });
  it('delete method should delete the user', async () => {
    await store.delete(1);
    const res = await store.index();
    expect(res).toEqual([
      {
        id: 3,
        title: 'Iron Manacles(2nd Edition)',
        description: 'Methods of fighting with iron cuffs.',
        price: '54.99',
      },
    ]);
  });
  /*  afterAll(async () => {
    await store.delete(1)
  }) */
});
