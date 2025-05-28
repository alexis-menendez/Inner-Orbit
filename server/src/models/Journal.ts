// File: server/src/models/Journal.ts

import mongoose, { Schema, Document } from "mongoose";

export type JournalInput = {
  userId: string;
  title: string;
  content: string;
  mood?: string;
};

export interface IJournalEntry extends Document {
  userId: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: Date;
}

const JournalEntrySchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IJournalEntry>(
  "JournalEntry",
  JournalEntrySchema
);