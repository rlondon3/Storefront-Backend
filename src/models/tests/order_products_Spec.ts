import { OrderStore } from '../order_products';
import { UserStore } from '../user';
import { ProductStore } from '../products';
import dotenv from 'dotenv';

const store = new OrderStore();

describe('Order Model', () => {
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

  it('index method should return orders', async () => {
    const res = await store.index();
    expect(res).toEqual([
      {
        id: 1,
        user_id: '1',
        order_status: 'active',
      },
    ]);
  });

  it('delete method should delete the order', async () => {
    await store.delete(1);
    const res = await store.index();
    expect(res).toEqual([]);
  });
});
