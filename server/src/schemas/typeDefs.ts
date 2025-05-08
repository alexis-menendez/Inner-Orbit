import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Video {
    id: ID!
    title: String!
    url: String!
    uploadedBy: User!
    createdAt: String!
  }

  type Entry {
    id: ID!
    mood: String!
    color: String!
    content: String!
    createdAt: String!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getCurrentUser: User
    getAllVideos: [Video]
    getEntries: [Entry]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    uploadVideo(title: String!, video: Upload!): Video!
    createEntry(mood: String!, content: String!): Entry!
    updateEntry(id: ID!, mood: String, content: String): Entry!
    deleteEntry(id: ID!): Boolean!
  }
`;
