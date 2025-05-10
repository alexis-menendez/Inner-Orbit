import mongoose, { Schema, Document } from "mongoose";

export interface IJournalEntry extends Document {
  title: string;
  content: string;
  mood?: string;
  createdAt: Date;
}

const JournalEntrySchema: Schema = new Schema({
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
