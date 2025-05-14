// File: server/src/models/Tracker.ts

import mongoose from 'mongoose';

const MoodEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'angry', 'frustrated', 'excited', 'bored', 'relaxed', 'stressed', 'confused', 'motivated', 'tired', 'grateful', 'hopeful', 'lonely', 'loved', 'overwhelmed', 'curious', 'creative', 'calm', 'disappointed', 'satisfied', 'confident', 'ashamed', 'jealous', 'nostalgic', 'indifferent', 'disconnected', 'connected', 'inspired', 'empowered', 'guilty', 'proud', 'embarassed', 'anxious','neutral'],
    required: true,
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
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
