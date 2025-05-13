// File: server/src/schema/typeDefs.ts

import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    dob: String
    moodEntries: [MoodEntry]
    journalEntries: [JournalEntry]
  }

  type MoodEntry {
    _id: ID!
    mood: String!
    moodColor: String!
    intensity: Int!
    date: Date! 
    createdAt: Date!
    user: User!
  }

  type JournalEntry {
    _id: ID!
    title: String!
    content: String!
    createdAt: Date!
    user: User!
  }

  type AuthPayload {
    token: String!
    user: User!
    success: Boolean
    message: String
  }

  input CreateJournalInput {
    userId: ID!
    title: String!
    content: String!
    mood: String
  }

  type CreateJournalPayload {
    success: Boolean!
    message: String
    entry: JournalEntry
  }

  type GetJournalEntriesPayload {
    success: Boolean!
    message: String
    entries: [JournalEntry!]!
  }

  input UpdateJournalInput {
    id: ID!
    title: String
    content: String
    mood: String
  }

  type UpdateJournalPayload {
    success: Boolean!
    message: String
    entry: JournalEntry
  }

  type Query {
    getJournalEntryById(entryId: ID!): JournalEntry
    getUserById(userId: ID!): User
    me: User
    getMoodEntryByDate(date: Date!): MoodEntry
    getMoodEntriesByDateRange(startDate: Date!, endDate: Date!): [MoodEntry]
    getMoodEntries: [MoodEntry]
    getJournalEntries: [JournalEntry]
  }

  type Mutation {
    createJournal(input: CreateJournalInput!): CreateJournalPayload!
    updateJournal(input: UpdateJournalInput!): UpdateJournalPayload!

    registerUser(
      username: String!
      firstName: String
      lastName: String
      dob: String
      email: String!
      password: String!
    ): AuthPayload

    loginUser(username: String!, password: String!): AuthPayload

    addMoodEntry(mood: String!, intensity: Int!): MoodEntry
    addJournalEntry(
      title: String!
      content: String!
      videoUrl: String
    ): JournalEntry

    updateMoodEntry(
      id: ID!
      mood: String
      intensity: Int
      color: String
    ): MoodEntry
    updateJournalEntry(
      id: ID!
      title: String
      content: String
      videoUrl: String
    ): JournalEntry

    deleteMoodEntry(id: ID!): Boolean
    deleteJournalEntry(id: ID!): Boolean
  }
`;

export default typeDefs;
