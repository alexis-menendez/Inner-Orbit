// File: server/src/controllers/trackerController.ts

import { Date } from 'mongoose';
import MoodEntry from '../models/Tracker.js';
import User from '../models/User.js'; 
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
    isDev?: boolean;
  };
}

interface AddMoodEntryArgs {
  date: Date;
  mood: string;
  intensity: number;
  moodColor: string;
  note?: string;
  userId: string;
}

export const createMoodEntry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { mood, notes, date } = req.body;
    const newMood = new MoodEntry({
      user: req.user._id,
      mood,
      notes,
      date
    });
    const saved = await newMood.save();
    return res.status(201).json(saved);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: 'Unknown error' });
  }
};

export const addMoodEntry = async ({
  date,
  mood,
  intensity,
  moodColor,
  note,
  userId,
}: AddMoodEntryArgs) => {
  console.log("[TRACKER] Creating mood entry:", { date, mood, intensity, moodColor, note, userId });

  const entry = await MoodEntry.create({
    date,
    mood,
    intensity,
    moodColor,
    note,
    userId,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { moodEntries: entry._id },
  });

  console.log("[TRACKER] Mood entry saved:", entry);

  return entry;
};

export const getUserMoodEntries = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const moods = await MoodEntry.find({ user: req.user._id }).sort({ date: -1 });
    return res.json(moods);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
};

export const updateMoodEntry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = await MoodEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { mood: req.body.mood, notes: req.body.notes },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    return res.json(updated);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: 'Unknown error' });
  }
};

export const deleteMoodEntry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const deleted = await MoodEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    return res.json({ message: 'Mood entry deleted' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
};
