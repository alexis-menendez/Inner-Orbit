// File: client/src/graphql/mutations.ts

import { gql } from '@apollo/client';

// === USER AUTH ===

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
      success
      message
    }
  }
`;


export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $firstName: String
    $lastName: String
    $dob: String
    $email: String!
    $password: String!
  ) {
    registerUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      dob: $dob
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
      }
      success
      message
    }
  }
`;

// === JOURNAL ===

export const CREATE_JOURNAL = gql`
  mutation CreateJournal($input: CreateJournalInput!) {
    createJournal(input: $input) {
      success
      message
      entry {
        _id
        title
        content
        mood
        createdAt
        userId
      }
    }
  }
`;

export const UPDATE_JOURNAL = gql`
  mutation UpdateJournal($input: UpdateJournalInput!) {
    updateJournal(input: $input) {
      success
      message
      entry {
        _id
        title
        content
        mood
        createdAt
        userId
      }
    }
  }
`;

export const UPDATE_JOURNAL_ENTRY = gql`
  mutation UpdateJournalEntry($id: ID!, $input: UpdateJournalInput!) {
    updateJournalEntry(id: $id, input: $input) {
      success
      message
      entry {
        _id
        title
        content
        createdAt
      }
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: ID!) {
    deleteJournalEntry(id: $id)
  }
`;

// === TRACKER ===

export const ADD_MOOD_ENTRY = gql`
  mutation AddMoodEntry($input: CreateMoodInput!) {
    addMoodEntry(input: $input) {
      success
      message
      entry {
        _id
        userId
        mood
        moodColor
        intensity
        date
        createdAt
        note
      }
    }
  }
`;

export const UPDATE_MOOD_ENTRY = gql`
  mutation UpdateMoodEntry($id: ID!, $input: UpdateMoodInput!) {
    updateMoodEntry(id: $id, input: $input) {
      success
      message
      entry {
        _id
        mood
        intensity
        moodColor
        note
        date
      }
    }
  }
`;

export const DELETE_MOOD_ENTRY = gql`
  mutation DeleteMoodEntry($id: ID!) {
    deleteMoodEntry(id: $id)
  }
`;

export const UPDATE_MOOD_NOTE = gql`
  mutation UpdateMoodNote($_id: ID!, $note: String!) {
    updateMoodNote(_id: $_id, note: $note) {
      _id
      note
    }
  }
`;
