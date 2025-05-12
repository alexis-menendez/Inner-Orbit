// File: client/src/models/GraphQL.ts

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
