// File: client/src/models/Journal.ts

export interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}

export interface Constellation {
  _id: string;
  name: string;
  createdAt: string;
}
