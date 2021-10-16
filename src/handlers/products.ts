import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };
  try {
    const addProduct = await store.create(product);
    res.json(addProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    id: parseInt(req.params.id),
  };
  try {
    const updateProduct = await store.update(product);
    res.json(updateProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deletes = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await store.delete(parseInt(req.params.id));
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const products_route = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.put('/products/:id', update);
  app.delete('/products/:id', deletes);
};

export default products_route;
