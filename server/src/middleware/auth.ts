// File: server/src/middleware/auth.ts

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Signs a payload with JWT using the secret key and a 2-hour expiration.
export const signToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error("Missing secret");
  return jwt.sign({ data: payload }, secret, { expiresIn: "2h" });
};

// Verifies a JWT token and returns the decoded payload.
export const verifyToken = (token: string): string | jwt.JwtPayload => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  return jwt.verify(token, secret);
};

// Express middleware to authenticate requests and attach user data to req.user.
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = (decoded as any).data;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
