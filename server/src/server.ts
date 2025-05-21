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
dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context <--this was updated/changed-->
const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { user: decoded }; // ✅ user = { id, username, ... }
  } catch {
    return { user: null };
  }
};


async function startServer() {
  await connectDB();

  const app = express();

  // Enable CORS before Apollo middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json());

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
    }
  );
  }

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});