# server
This folder contains all back-end code for the application, built with Node.js, Express, and Apollo Server.

### Technologies:
- Node.js
- Express
- Apollo Server (GraphQL)
- MongoDB with Mongoose
- JWT Authentication

### Key Subfolders:
- `config/`: Database and environment configuration
- `controllers/`: Business logic for GraphQL operations
- `graphql/`: GraphQL schema and resolvers
  - `typeDefs/`: Schema definitions
  - `resolvers/`: Logic for queries and mutations
- `middleware/`: Custom middleware (e.g. authentication)
- `models/`: Mongoose schemas for MongoDB collections
- `utils/`: Helper functions for backend logic

### Entry Point:
- `index.js`: Sets up the Express server, connects to MongoDB, applies middleware, and initializes Apollo Server
