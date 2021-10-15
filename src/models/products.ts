import client from '../database';
import { PoolClient } from 'pg';

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Could not get products: ${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not find product: ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not create product: ${err}`);
    }
  }
  async update(product: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name=($1), description=($2) price=($3) WHERE id=($4) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [
        product.name,
        product.description,
        product.price,
        product.id,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not update product: ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product: ${err}`);
    }
  }
}
