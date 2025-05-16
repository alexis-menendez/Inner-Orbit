// File: client/src/models/GraphQL.ts

import { JournalEntry } from './Journal';
import { MoodEntry } from './Tracker';

// ----- Journal -----
export interface CreateJournalPayload {
  success: boolean;
  message?: string;
  entry: JournalEntry | null;
}

export interface GetJournalEntriesPayload {
  success: boolean;
  message?: string;
  entries: JournalEntry[];
}

// ----- Mood Tracker -----
export interface CreateMoodPayload {
  success: boolean;
  message?: string;
  entry: MoodEntry | null;
}

export interface GetMoodEntriesPayload {
  success: boolean;
  message?: string;
  entries: MoodEntry[];
}
