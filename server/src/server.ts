// FILE: server/src/server.ts

import express, { Request } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import jwt from "jsonwebtoken";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { connectDB } from "./config/connections.js";

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import libraryRoutes from './routes/libraryRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context
const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { user: null };

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
    const normalizedUser = { ...decoded, _id: decoded.id };
    return { user: normalizedUser };
  } catch {
    return { user: null };
  }
};

async function startServer() {
  await connectDB();

  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:3000",
          "http://localhost:4173",
          "https://inner-orbit.onrender.com"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(express.json());

  app.use('/api/library', libraryRoutes);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error("GraphQL Error:", formattedError);
      return formattedError;
    },
  });

  await server.start();

  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
    console.log(`Library REST API ready at http://localhost:${PORT}/api/library/videos`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});
