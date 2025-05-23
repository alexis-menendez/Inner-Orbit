// File: server/src/schema/typeDefs.ts

import { gql } from "graphql-tag";

const typeDefs = gql`

  scalar Date

  type AuthPayload {
    token: String!
    user: User!
    success: Boolean
    message: String
  }

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
    userId: ID!
    date: Date!
    mood: String!
    moodColor: String!
    intensity: Int!
    note: String
    createdAt: Date!
  }

  type MoodEntryResponse {
    success: Boolean!
    message: String!
    entries: [MoodEntry!]!
  }

  type CreateMoodPayload {
    success: Boolean!
    message: String
    entry: MoodEntry
  }

  type UpdateMoodPayload {
    success: Boolean!
    message: String
    entry: MoodEntry
  }

  type GetMoodEntriesPayload {
    success: Boolean!
    message: String
    entries: [MoodEntry!]!
  }

  input CreateMoodInput {
    userId: ID!
    date: Date!
    mood: String!
    intensity: Int!
    moodColor: String!
    note: String
  }

  input UpdateMoodInput {
    mood: String
    intensity: Int
    moodColor: String
    note: String
  }

    type JournalEntry {
    _id: ID!
    userId: ID!
    title: String!
    content: String!
    mood: String
    createdAt: Date!
  }

  type CreateJournalPayload {
    success: Boolean!
    message: String
    entry: JournalEntry
  }

  type UpdateJournalPayload {
    success: Boolean!
    message: String
    entry: JournalEntry
  }

  type GetJournalEntriesPayload {
    success: Boolean!
    message: String
    entries: [JournalEntry!]!
  }

  type CompletedConstellationsPayload {
    count: Int!
    names: [String!]!
    message: String
  }

  input CreateJournalInput {
    userId: ID!
    title: String!
    content: String!
    mood: String
  }

  input UpdateJournalInput {
    title: String
    content: String
    mood: String
  }

  type Query {
    getUserById(userId: ID!): User
    me: User
  }

  extend type Query {
    getMoodEntriesByDateRange(startDate: Date!, endDate: Date!): [MoodEntry]
    getMoodEntries(userId: ID): MoodEntryResponse!
    getMoodEntryByDate(userId: ID!, date: Date!): MoodEntry
    moodsByDates(userId: ID!, dates: [String!]!): [MoodEntry]
  }

  extend type Query {
    getJournalEntries(userId: ID!): GetJournalEntriesPayload!
    getJournalEntryById(entryId: ID!): JournalEntry  
    getCompletedConstellations(userId: ID!): CompletedConstellationsPayload!
  }
 
  type Mutation {
      registerUser(
        username: String!
        firstName: String
        lastName: String
        dob: String
        email: String!
        password: String!
      ): AuthPayload

      loginUser(
        username: String!
        password: String!
      ): AuthPayload
    }

    extend type Mutation {
      addMoodEntry(input: CreateMoodInput!): CreateMoodPayload!
      updateMoodEntry(id: ID!, input: UpdateMoodInput!): UpdateMoodPayload!
      deleteMoodEntry(id: ID!): Boolean
    }

    extend type Mutation {
      createJournal(input: CreateJournalInput!): CreateJournalPayload!
      updateJournal(input: UpdateJournalInput!): UpdateJournalPayload!
      updateJournalEntry(id: ID!, input: UpdateJournalInput!): CreateJournalPayload!
      deleteJournalEntry(id: ID!): Boolean
    }

  `;

export default typeDefs;
