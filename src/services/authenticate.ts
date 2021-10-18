import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

dotenv.config();

interface TokenInterface {
  user: User;
  iat: number;
}

export const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHead = req.headers.authorization;
    const token = (authHead as string).split(' ')[1];
    jwt.verify(token, `${process.env.TOKEN_SECRET}` as jwt.Secret);
    next();
  } catch (err) {
    res.status(400);
    res.json(`Not authorized: ${err}`);
    return;
  }
};
export const authUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHead = req.headers.authorization;
    const token = (authHead as string).split(' ')[1];
    const decoded = jwt.verify(
      token,
      `${process.env.TOKEN_SECRET}` as jwt.Secret
    );
    const id = (decoded as TokenInterface).user.id;
    if (id !== parseInt(req.params.id)) {
      throw new Error('ID is invalid');
    }
    next();
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
};
