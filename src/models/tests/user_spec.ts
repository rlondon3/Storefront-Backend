import { UserStore } from '../user';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);
const { SPEC_TEST_PASSWORD } = process.env;
const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });
  describe('POST: Test user endpoint', () => {
    let token: string;
    it('POST: Test should create a user', async () => {
      const resp = await request
        .post('/create/user')
        .send({
          username: 'test_user',
          password: SPEC_TEST_PASSWORD as string,
        })
        .set('Accepted', 'application/json');
      token = 'Bearer ' + resp.body;
      expect(resp.status).toEqual(200);
    });
    it('POST: Verify tokens of users', async () => {
      const resp = await request
        .post('/verify/users')
        .set('Authorization', token);
      expect(resp.status).toEqual(200);
    });
    it('POST: Verify token of user', async () => {
      const resp = await request
        .post('/verify/users/1')
        .set('Authorization', token);
      expect(resp.body.username).toEqual('test_user');
    });
    it('PUT: Should update the user', async () => {
      const resp = await request
        .put('/users/2')
        .set('Authorization', token)
        .send({
          username: 'test_user2',
          password: `${SPEC_TEST_PASSWORD}` as string,
        })
        .set('Accepted', 'application/json');
      expect(resp.status).toEqual(200);
    });
    it('AUTHENTICATE: Authentication should fail', async () => {
      const resp = await request
        .post('/users/authenticate')
        .send({
          username: 'test_user5',
          password: SPEC_TEST_PASSWORD as string,
        })
        .set('Accepted', 'application/json');
      expect(resp.status).toBe(400);
    });
    it('DELETE: Tests deletion of user', async () => {
      const resp = await request
        .delete('/users/2')
        .set('Authorization', token)
        .set('Accepted', 'application/json');
      expect(resp.status).toBe(200);
    });
  });
  it('index method should return users', async () => {
    const res = await store.index();
    expect(res).toHaveSize(1);
    expect(res[0].username).toEqual('test_user');
  });
  it('UPDATE: should update user', async () => {
    const updateUser = {
      id: 1,
      username: 'test_user3',
      password: `${SPEC_TEST_PASSWORD}` as string,
    };
    const res = await store.update(updateUser);
    expect(res.username).toEqual('test_user3');
  });
  it('delete method should delete the user', async () => {
    await store.delete(1);
    const res = await store.index();
    expect(res).toEqual([]);
  });
});
