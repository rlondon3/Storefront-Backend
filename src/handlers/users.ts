import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User, UserStore } from '../models/user';
import jsonwebtoken from 'jsonwebtoken';
import { authToken, authUserId } from '../middleware/authenticate';

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jsonwebtoken.sign(
      {
        user: newUser,
      },
      process.env.TOKEN_SECRET as jsonwebtoken.Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const updates = await store.update(user);
    const token = jsonwebtoken.sign(
      {
        user: updates,
      },
      process.env.TOKEN_SECRET as jsonwebtoken.Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deletes = async (req: Request, res: Response) => {
  try {
    const delete_user = await store.delete(parseInt(req.params.id));
    res.json(delete_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const authUser = await store.authenticate(
      req.body.username,
      req.body.password
    );
    const token = jsonwebtoken.sign(
      {
        user: authUser,
      },
      process.env.TOKEN_SECRET as jsonwebtoken.Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const users_route = (app: express.Application) => {
  app.get('/users', authToken, index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.put('/users/:id', authUserId, update);
  app.delete('/users/:id', authUserId, deletes);
  app.post('/users/authenticate', authenticate);
};

export default users_route;
