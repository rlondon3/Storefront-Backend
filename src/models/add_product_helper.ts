import client from '../database';
import { PoolClient } from 'pg';

export type ProductOrdered = {
  quantity: number;
  product_id: number;
  order_id: number;
  id?: number;
};

export class AddOrder {
  async ProductOrdered(addProduct: ProductOrdered): Promise<ProductOrdered> {
    try {
      const addInSql = 'SELECT * FROM orders WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(addInSql, [addProduct.order_id]);

      if (res.rows[0].order_status !== 'active') {
        throw Error(`Could not place order. Order status is not active.`);
      }
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`There is an error with this order: ${err}`);
    }
  }
}
