const express = require('express');
const { ApolloServer } = require('@apollo/server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });
// ...init server, connect to DB, listen, etc.
