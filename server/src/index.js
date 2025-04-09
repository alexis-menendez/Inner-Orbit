import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { typeDefs, resolvers } from './graphql/index.js';
import { authMiddleware } from './middleware/auth.js';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// Initialize Apollo Server with context (auth) and Playground enabled
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  introspection: true, // enables schema introspection
  playground: true     // enables GraphQL Playground
});

async function startServer() {
  await server.start();                        // Start the Apollo Server
  server.applyMiddleware({ app });             // Apply it as middleware to Express

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yourdbname', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🛸 MongoDB connected');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();

