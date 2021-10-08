import { Book, LegendaryBookStore } from '../legendary_books';

const store = new LegendaryBookStore();

describe('Legendary Book Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const res = await store.index();
    expect(res).toEqual([]);
  });
});
