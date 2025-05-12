// File: client/src/models/Journal.ts

export interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}
