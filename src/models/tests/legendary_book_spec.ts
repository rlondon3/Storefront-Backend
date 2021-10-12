import { Book, LegendaryBookStore } from '../legendary_books';

const store = new LegendaryBookStore();

describe('Legendary Book Model', () => {
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

  it('create method adds books', async () => {
    const res = await store.create({
      title: 'Fist and Intent Boxing',
      author: 'Guo Yun Shen',
      synopsis: 'Mix the divine intent with combat.',
      published_era: 'Three Kingdom Era',
      pages: 288,
      last_known_citing: 'Meng Zi: Life and Philosophy',
    });

    expect(res).toEqual({
      title: 'Fist and Intent Boxing',
      author: 'Guo Yun Shen',
      synopsis: 'Mix the divine intent with combat.',
      published_era: 'Three Kingdom Era',
      pages: 288,
      last_known_citing: 'Meng Zi: Life and Philosophy',
      id: 1,
    });
  });

  it('index method should return books', async () => {
    const res = await store.index();
    expect(res).toEqual([
      {
        title: 'Fist and Intent Boxing',
        author: 'Guo Yun Shen',
        synopsis: 'Mix the divine intent with combat.',
        published_era: 'Three Kingdom Era',
        pages: 288,
        last_known_citing: 'Meng Zi: Life and Philosophy',
        id: 1,
      },
    ]);
  });

  it('show method should give books', async () => {
    const res = await store.show(1);
    expect(res).toEqual({
      title: 'Fist and Intent Boxing',
      author: 'Guo Yun Shen',
      synopsis: 'Mix the divine intent with combat.',
      published_era: 'Three Kingdom Era',
      pages: 288,
      last_known_citing: 'Meng Zi: Life and Philosophy',
      id: 1,
    });
  });

  it('update method should update book info', async () => {
    const res = await store.update({
      title: '8 Triagram Palm',
      author: 'Dong Hai Chuan',
      synopsis: 'The Divinity Palms of circular walking',
      published_era: 'The Warring States Era',
      pages: 288,
      last_known_citing: 'Unknown',
      id: 1,
    });
    expect(res).toEqual({
      title: '8 Triagram Palm',
      author: 'Dong Hai Chuan',
      synopsis: 'The Divinity Palms of circular walking',
      published_era: 'The Warring States Era',
      pages: 288,
      last_known_citing: 'Unknown',
      id: 1,
    });
  });
  it('delete method should delete the book', async () => {
    store.delete(1);
    const res = await store.index();
    expect(res).toEqual([]);
  });
});
