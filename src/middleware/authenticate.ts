import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

interface TokenInterface {
  user: User;
  id: number;
}

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead = req.headers.authorization;
    const token = (authHead as string).split('')[1];
    const decoded = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    next();
  } catch (err) {
    res.status(401);
    res.json(`Not authorized: ${err}`);
    return;
  }
};
export const authUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead = req.headers.authorization;
    const token = (authHead as string).split('')[1];
    const decoded = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET as string
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
