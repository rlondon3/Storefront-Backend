import client from '../database';
import { PoolClient } from 'pg';

export type Book = {
  title: string;
  author: string;
  synopsis: string;
  published_era: string;
  pages: number;
  last_known_citing: string;
  id?: number;
};

export class LegendaryBookStore {
  async index(): Promise<Book[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'SELECT * FROM legendary_fighting_books';
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Cannot get books: ${err}`);
    }
  }

  async show(id: number): Promise<Book> {
    try {
      const sql = 'SELECT * FROM legendary_fighting_books WHERE id=($1)';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Cannot find ${err}`);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const sql =
        'INSERT INTO legendary_fighting_books (title, author, synopsis, published_era, pages, last_known_citing) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [
        book.title,
        book.author,
        book.synopsis,
        book.published_era,
        book.pages,
        book.last_known_citing,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new book: ${err}`);
    }
  }
  async update(book: Book): Promise<Book> {
    try {
      const sql =
        'UPDATE legendary_fighting_books SET title=($1), author=($2), synopsis=($3), published_era=($4), pages=($5), last_known_citing=($6) WHERE id=($7) RETURNING *';
      const conn: PoolClient = await client.connect();
      const res = await conn.query(sql, [
        book.title,
        book.author,
        book.synopsis,
        book.published_era,
        book.pages,
        book.last_known_citing,
        book.id,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not update book: ${err}`);
    }
  }
  async delete(id: number): Promise<Book> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'DELETE FROM legendary_fighting_books WHERE id=($1)';
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete book: ${err}`);
    }
  }
}
