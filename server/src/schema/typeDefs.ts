// File: server/src/schema/typeDefs.ts

import gql from 'graphql-tag'; 


const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    isDev: Boolean
    createdAt: String
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    getUserById(userId: ID!): User
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(username: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;
