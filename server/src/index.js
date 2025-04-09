import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve path to .env in the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Explicit root .env load

import { typeDefs, resolvers } from './graphql/index.js';
import { authMiddleware } from './middleware/auth.js';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// 🚀 Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  introspection: true,
  playground: true,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🛸 MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();
