const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
