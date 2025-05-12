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
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
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
