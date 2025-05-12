// File: client/src/graphql/mutations.ts

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

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
      }
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: ID!) {
    deleteJournalEntry(id: $id)
  }
`;

export const ADD_MOOD_ENTRY = gql`
  mutation AddMoodEntry($mood: String!, $intensity: Int!, $color: String!) {
    addMoodEntry(mood: $mood, intensity: $intensity, color: $color) {
      _id
      mood
      moodColor
      intensity
      createdAt
    }
  }
`;

export const UPDATE_MOOD_ENTRY = gql`
  mutation UpdateMoodEntry($id: ID!, $mood: String, $intensity: Int, $color: String) {
    updateMoodEntry(id: $id, mood: $mood, intensity: $intensity, color: $color) {
      _id
      mood
      moodColor
      intensity
      createdAt
    }
  }
`;

export const DELETE_MOOD_ENTRY = gql`
  mutation DeleteMoodEntry($id: ID!) {
    deleteMoodEntry(id: $id)
  }
`;
