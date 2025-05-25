// File: client/src/models/User.ts

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  moodEntries?: any[];
  journalEntries?: any[];
}
