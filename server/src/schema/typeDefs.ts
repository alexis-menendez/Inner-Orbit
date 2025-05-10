// File: server/src/schema/typeDefs.ts

import gql from "graphql-tag";

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
    registerUser(
      username: String!
      email: String!
      password: String!
    ): AuthPayload
    loginUser(username: String!, password: String!): AuthPayload
  }
    
  input RecordJournalInput {
    title: String!
    content: String!
    mood: String
  }

  type JournalEntry {
    id: ID!
    title: String!
    content: String!
    mood: String
    createdAt: String!
  }

  type RecordJournalPayload {
    success: Boolean!
    message: String
    entry: JournalEntry
  }

  type Mutation {
    recordJournal(input: RecordJournalInput!): RecordJournalPayload!
  }
`;

export default typeDefs;
