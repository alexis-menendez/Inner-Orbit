// File: server/src/models/Tracker.ts

import mongoose from 'mongoose';

const MoodEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Anxious', 'Excited', 'Angry', 'Neutral'],
    required: true,
  },
  moodColor: {
    type: String,
    required: true,
  },
  notes: {
    type: String, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export default mongoose.model('MoodEntry', MoodEntrySchema);
