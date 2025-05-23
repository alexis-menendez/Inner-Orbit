// File: server/src/controllers/trackerController.ts

import MoodEntry, { IMoodEntry, MoodInput } from '../models/Tracker.js';
import User from '../models/User.js';

export const addMoodEntry = async (input: MoodInput): Promise<{
  success: boolean;
  message: string;
  entry: IMoodEntry | null;
}> => {
  console.log("[TRACKER] Creating mood entry:", input);

  try {
    const newEntry = new MoodEntry({
      userId: input.userId,
      date: input.date,
      mood: input.mood,
      intensity: input.intensity,
      moodColor: input.moodColor,
      note: input.note || '',
    });

    const saved = await newEntry.save();

    // Link entry to user
    await User.findByIdAndUpdate(input.userId, {
      $push: { moodEntries: saved._id },
    });

    console.log("[TRACKER] Mood entry saved:", saved);

    return {
      success: true,
      message: "Mood entry recorded successfully",
      entry: saved,
    };
  } catch (error) {
    console.error("Error recording mood entry:", error);
    return {
      success: false,
      message: "Failed to record mood entry",
      entry: null,
    };
  }
};

export const getAllMoodEntries = async (): Promise<{
  success: boolean;
  message: string;
  entries: IMoodEntry[] | null;
}> => {
  try {
    const entries = await MoodEntry.find().sort({ createdAt: -1 });

    return {
      success: true,
      message: "Mood entries fetched successfully",
      entries,
    };
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return {
      success: false,
      message: "Failed to fetch mood entries",
      entries: null,
    };
  }
};
