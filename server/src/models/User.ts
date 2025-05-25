// File: server/src/models/User.ts

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  dob: String,
  isDev: {
    type: Boolean,
    default: false,
  },
  moodEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MoodEntry' }],
  journalEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JournalEntry' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', UserSchema);
