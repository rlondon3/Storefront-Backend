import { User, UserStore } from '../user';

const store = new UserStore();

describe('Legendary User Model', () => {
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
  it('create method adds user', async () => {
    const res = await store.create({
      username: 'talentedBoxer',
      password: 'NoShadowKick',
    });
    expect(res).toBeDefined();
  });

  it('index method should return users', async () => {
    const res = await store.index();
    expect(res).toHaveSize(1);
    expect(res[0].username).toEqual('talentedBoxer');
  });

  it('delete method should delete the user', async () => {
    store.delete(1);
    const res = await store.index();
    expect(res[0].id).toEqual(1);
  });
});
