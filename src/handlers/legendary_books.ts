import express, { Request, Response } from 'express';
import { Book, LegendaryBookStore } from '../models/legendary_books';
import { authToken } from '../middleware/authenticate';

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

const show = async (req: Request, res: Response) => {
  try {
    const book = await store.show(parseInt(req.params.id));
    res.json(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const legendary_fighting_book: Book = {
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    published_era: req.body.published_era,
    pages: req.body.pages,
    last_known_citing: req.body.last_known_citing,
  };
  try {
    const book = await store.create(legendary_fighting_book);
    res.json(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const legendary_fighting_book: Book = {
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    published_era: req.body.published_era,
    pages: req.body.pages,
    last_known_citing: req.body.last_known_citing,
    id: parseInt(req.params.id),
  };
  try {
    const book = await store.update(legendary_fighting_book);
    res.json(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deletes = async (req: Request, res: Response) => {
  try {
    const delete_book = await store.delete(parseInt(req.params.id));
    res.json(delete_book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const legendary_books_route = (app: express.Application) => {
  app.get('/legendary_fighting_books', index);
  app.get('/legendary_fighting_books/:id', show);
  app.post('/legendary_fighting_books', authToken, create);
  app.put('/legendary_fighting_books/:id', authToken, update);
  app.delete('/legendary_fighting_books/:id', authToken, deletes);
};

export default legendary_books_route;
