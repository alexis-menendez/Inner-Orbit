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
    note: String 
  }

  type MoodByDate {
  date: String!
  mood: String!
  note: String
}

  type JournalEntry {
    _id: ID!
    title: String!
    content: String!
    mood: String
    createdAt: Date!
    userId: ID!
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

  input UpdateJournalInput {
    id: ID!
    title: String
    content: String
    mood: String
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


  type Query {
    getUserById(userId: ID!): User
    getJournalEntryById(entryId: ID!): JournalEntry
    getMoodEntryByDate(userId: ID!, date: Date!): MoodEntry
    getMoodEntriesByDateRange(startDate: Date!, endDate: Date!): [MoodEntry]
    getMoodEntries: [MoodEntry]
    getJournalEntries(userId: ID!): GetJournalEntriesPayload!
    moodsByDates(dates: [String!]!): [MoodEntry]
    me: User
  }


  extend type Query {
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

    loginUser(username: String!, password: String!): AuthPayload

    addMoodEntry(mood: String!, intensity: Int!): MoodEntry
    updateMoodEntry(id: ID!, mood: String, intensity: Int, color: String): MoodEntry
    deleteMoodEntry(id: ID!): Boolean

    createJournal(input: CreateJournalInput!): CreateJournalPayload!
    updateJournal(input: UpdateJournalInput!): UpdateJournalPayload!
    deleteJournalEntry(id: ID!): Boolean
  }


`;

export default typeDefs;
