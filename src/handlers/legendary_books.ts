import express, { Request, Response } from 'express';
import { Book, LegendaryBookStore } from '../models/legendary_books';

const store = new LegendaryBookStore();

const index = async (_req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const legendary_book_route = (app: express.Application) => {
  app.get('/products', index);
};

export default legendary_book_route;
