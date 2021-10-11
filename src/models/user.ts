import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

export type User = {
  id?: number;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const conn = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Can't retrieve users: ${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Can't find user: ${err}`);
    }
  }
  async create(usr: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        usr.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as unknown as string)
      );
      const res = await conn.query(sql, [usr.username, hash]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Coud not add user: ${err}`);
    }
  }
  async update(usr: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username=($1), password=($2) WHERE id=($3) RETURNING *';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        usr.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as unknown as string)
      );
      const res = await conn.query(sql, [usr.username, hash]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not update user: ${err}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user: ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const conn = await client.connect();
      const res = await conn.query(sql, [username]);
      if (res.rows.length) {
        const user = res.rows[0];
        console.log(user);
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate: ${err}`);
    }
  }
}
