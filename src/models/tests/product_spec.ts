import { ProductStore } from '../products';

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

  it('create method adds product', async () => {
    const res = await store.create({
      title: 'Iron Manacles',
      description: 'Methods of fighting with iron cuffs.',
      price: 54.99,
    });
    expect(res).toEqual({
      id: 1,
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
        title: 'Iron Manacles',
        description: 'Methods of fighting with iron cuffs.',
        price: '54.99',
      },
    ]);
  });

  it('delete method should delete the user', async () => {
    await store.delete(1);
    const res = await store.index();
    expect(res).toEqual([]);
  });
  /*  afterAll(async () => {
    await store.delete(1)
  }) */
});
