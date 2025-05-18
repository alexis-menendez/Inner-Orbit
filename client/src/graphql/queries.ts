// File: client/src/graphql/queries.ts

import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      moodEntries {
        _id
        mood
        moodColor
        intensity
        createdAt
      }
      journalEntries {
        _id
        title
        content
        mood
        createdAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
 query GetMoodEntries {
    getMoodEntries {
      _id
      date
      mood
      intensity
      moodColor
      note
    }
  }
`;

export const GET_MOOD_ENTRIES = gql`
  query GetMoodEntries {
    getMoodEntries {
      _id
      mood
      moodColor
      intensity
      createdAt
    }
  }
`;

export const GET_WEEKLY_MOODS = gql`
  query MoodsByDates($dates: [String!]!, $userId: ID!) {
    moodsByDates(dates: $dates, userId: $userId) {
      _id
      date
      mood
      moodColor
      intensity
      note
      createdAt
    }
  }
`;
export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries($userId: ID!) {
    getJournalEntries(userId: $userId) {
      success
      message
      entries {
        _id
        title
        content
        mood
        createdAt
      }
    }
  }
`;

export const GET_JOURNAL_ENTRY_BY_ID = gql`
  query GetJournalEntryById($entryId: ID!) {
    getJournalEntryById(entryId: $entryId) {
      _id
      title
      content
      mood
      createdAt
    }
  }
`;

export const GET_CONSTELLATIONS = gql`
  query GetConstellations {
    getConstellations {
      success
      constellations {
        _id
        name
        createdAt
      }
    }
  }
`;

export const GET_JOURNAL_ENTRIES_FOR_CONSTELLATION = gql`
  query GetJournalEntries($constellationId: ID!) {
    getJournalEntries(constellationId: $constellationId) {
      _id
      date
      content
      constellationId
    }
  }
`;