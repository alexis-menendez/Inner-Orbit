# server
This folder contains all back-end code for the application, built with Node.js, Express, and Apollo Server.

### Technologies:
- Node.js
- Express
- Apollo Server (GraphQL)
- MongoDB with Mongoose
- JWT Authentication

### Basic Structure:
- `src/`: All source code (see `server-src.md` for details)
- `index.js`: Application entry point (imports from `src/`)
- `package.json`: Backend dependencies and scripts

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

### File Structure:
server/ ............................... *# Node.js + Express + GraphQL backend*  
  └── src/  
  |    ├── config/ .................... *# DB config, JWT secret, environment setup*    
  |    ├── controllers/ ............... *# Logic for handling GraphQL resolvers*    
  |    ├── graphql/ ................... *# Schema and resolvers*    
  |    │    ├── resolvers/ ............ *# Mutation & query resolver logic*    
  |    │    └── typeDefs/ ............. *# GraphQL type definitions*   
  |    |    
  |    ├── middleware/ ................. *# Auth middleware, error handling*    
  |    ├── models/ ..................... *# Mongoose models*    
  |    └── utils/ ...................... *# Helper functions (e.g., auth, validators)*   
  |         
  ├── index.js ......................... *# Entry point (Express app + Apollo server)*    
  └── package.json ..................... *# Backend dependencies*  
