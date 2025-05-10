// File: server/src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'supersecretkey';

interface AuthPayload {
  _id: string;
  username: string;
  isDev?: boolean;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as AuthPayload;
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
