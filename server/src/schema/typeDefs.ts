// File: server/src/schema/typeDefs.ts

import gql from 'graphql-tag'; 


const typeDefs = gql`
   type User {
    _id: ID!
    username: String!
    email: String!
    moodEntries: [MoodEntry]
    //journalEntries: [JournalEntry]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUserById(userId: ID!): User
    me: User
    getMoodEntries: [MoodEntry]
    //getJournalEntries: [JournalEntry]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(username: String!, password: String!): AuthPayload

    addMoodEntry(mood: String!, intensity: Int!, color: String!): MoodEntry
    //addJournalEntry(title: String!, content: String!, videoUrl: String): JournalEntry

    updateMoodEntry(id: ID!, mood: String, intensity: Int, color: String): MoodEntry
    //updateJournalEntry(id: ID!, title: String, content: String, videoUrl: String): JournalEntry

    deleteMoodEntry(id: ID!): Boolean
    //deleteJournalEntry(id: ID!): Boolean
  }
`;

export default typeDefs;
