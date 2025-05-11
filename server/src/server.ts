// File: server/src/server.ts
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import jwt from "jsonwebtoken";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { connectDB } from "./config/connections.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context
const context = async ({ req }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { user: decoded };
  } catch {
    return { user: null };
  }
};

async function startServer() {
  await connectDB();

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error("GraphQL Error:", formattedError);
      return formattedError;
    },
  });

  await server.start();

  // 👇 IMPORTANT: These need to be added *inside* the route chain
  app.use(
    "/graphql",
    express.json(), // required to parse req.body
    express.urlencoded({ extended: true }), // in case url-encoded is used
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});
