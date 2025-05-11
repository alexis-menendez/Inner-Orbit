// File: server/src/utils/auth.ts

import jwt from "jsonwebtoken";

const expiration = "2h";

export const signToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid token");
  }
};
