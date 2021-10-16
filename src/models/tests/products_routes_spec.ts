import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

const { SPEC_TEST_PASSWORD } = process.env;

describe('Products endpoint testing', () => {
  let token: string;
  it('POST: Test should create a product', async () => {
    const resp = await request
      .post('/products')
      .send({
        title: 'The Triagram Palms',
        description:
          'The palm fighting method of divine intention. Used by boxers in the Warring States Period.',
        price: '99.99',
      })
      .set('Accepted', 'application/json');
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
      .put('/products/2')
      .send({
        id: 2,
        title: 'The Triagram Palms(2nd Ed.)',
        description:
          'The palm fighting method of divine intention. Used by boxers in the Warring States Period.',
        price: '99.99',
      })
      .set('Accepted', 'application/json');
    expect(resp.body.title).toBe('The Triagram Palms(2nd Ed.)');
  });
  it('DELETE: Tests endpoint to delete product', async () => {
    const resp = await request
      .delete('/products/2')
      .set('Authorization', token)
      .set('Accepted', 'application/json');
    expect(resp.status).toBe(200);
  });
});
