import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/config.js';
import { authenticate } from './middleware/authMiddleware.js';
import { typeDefs, resolvers } from './graphql/schema.js';

// Load environment variables
dotenv.config();

// MongoDB connection
connectDB();

const app = express();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Attach user to context based on JWT token
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    return { user };
  }
});

// Apply Apollo middleware
server.applyMiddleware({ app });

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000/graphql');
});
