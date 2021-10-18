import express, { Request, Response } from 'express';
import { Order, OrderStore, ProductOrdered } from '../models/orders';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    order_status: 'active',
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const order: Order = {
    id: parseInt(req.params.id),
    user_id: req.body.user_id,
    order_status: req.body.order_status,
  };
  try {
    const updateOrder = await store.update(order);
    res.json(updateOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deletes = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(parseInt(req.params.id));
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product = async (req: Request, res: Response) => {
  const productOrder: ProductOrdered = {
    quantity: parseInt(req.body.quantity),
    product_id: req.body.product_id,
    order_id: req.params.id,
  };
  try {
    const ordered = await store.productOrdered(productOrder);
    res.json(ordered);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_route = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.put('/orders/:id', update);
  app.delete('/orders/:id', deletes);
  app.post('/orders/:id/products', product);
};

export default order_route;
