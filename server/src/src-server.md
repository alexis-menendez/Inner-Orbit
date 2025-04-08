# server src
This folder contains all server-side application logic and configuration.

### Subfolders:

- `config/`: Handles environment setup and MongoDB connection configuration.
- `controllers/`: Contains functions used in resolvers to perform logic and interact with models.
- `graphql/`: GraphQL schema and resolver definitions.
  - `typeDefs/`: GraphQL SDL type definitions.
  - `resolvers/`: Functions that respond to queries and mutations.
- `middleware/`: Express/Apollo middleware, such as authentication or error handling.
- `models/`: Mongoose models that define the structure of your MongoDB documents.
- `utils/`: Helper functions such as token handling, input validation, etc.

This folder is imported into `server/index.js`, which initializes the Express server, connects to MongoDB, and sets up Apollo Server.

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
