// File: server/src/utils/auth.ts

import jwt from "jsonwebtoken";

const expiration = "2h";

export const signToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }


// ✅ UPDATED
return jwt.sign(payload, secret, { expiresIn: expiration });


};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid token");
  }
};
