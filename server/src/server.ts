// File: server/src/server.ts

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';
import { connectDB } from './config/connections';

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// JWT-based context for GraphQL
const context = async ({ req }: ExpressContextFunctionArgument) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { user: decoded };
  } catch {
    return { user: null };
  }
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Apollo Server with optional formatError for logging
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error('GraphQL Error:', formattedError);
      return formattedError;
    },
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  // GraphQL endpoint with context middleware
  app.use(
    '/graphql',
    expressMiddleware(server, { context })
  );

  await connectDB();

  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
