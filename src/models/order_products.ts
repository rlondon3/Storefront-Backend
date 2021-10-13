import client from '../database';
import { PoolClient } from 'pg';

export type Order = {
  id?: number;
  user_id: number;
  order_status: string;
};

export type ProductOrdered = {
  quantity: number;
  product_id: number;
  order_id: number;
  id?: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Could not get orders: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not find orders: ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [order.order_status, order.user_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not add order: ${err}`);
    }
  }

  async ProductOrdered(addProduct: ProductOrdered): Promise<ProductOrdered> {
    try {
      const addInSql = 'SELECT * FROM orders WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(addInSql, [addProduct.order_id]);

      if (res.rows[0].order_status !== 'active') {
        throw Error(`Could not place order. Order status is not active.`);
      }
      conn.release();
    } catch (err) {
      throw new Error(`There is an error with this order: ${err}`);
    }
    try {
      const sql =
        'INSERT INTO products_ordered (order_id, product_id, quanitity) VALUES ($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const res = await conn.query(sql, [
        addProduct.order_id,
        addProduct.product_id,
        addProduct.quantity,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not add product: ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE orders SET user_id=($1), order_status=($2) WHERE id=($3) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [
        order.user_id,
        order.order_status,
        order.id,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not update order: ${err}`);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not delte order: ${err}`);
    }
  }
}
