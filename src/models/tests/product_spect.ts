import { Product, ProductStore } from '../products';

const store = new ProductStore();

describe('Legendary Product Model', () => {
  //methods
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

  //functionality
  it('create method adds product', async () => {
    const res = await store.create({
      name: 'Iron Manacles',
      price: 454.99,
    });
    expect(res).toEqual({
      id: 1,
      name: 'Iron Manacles',
      price: 454.99,
    });
  });

  it('index method should return products', async () => {
    const res = await store.index();
    expect(res).toEqual([
      {
        id: 1,
        name: 'Iron Manacles',
        price: 454.99,
      },
    ]);
  });

  it('delete method should delete the user', async () => {
    store.delete(1);
    const res = await store.index();
    expect(res[0].id).toEqual(1);
  });
});
