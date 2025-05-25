// File: server/src/controllers/trackerController.ts

import MoodEntry, { IMoodEntry, MoodInput } from '../models/Tracker.js';
import User from '../models/User.js';
import { formatMoodEntry } from '../utils/formatEntry.js'; // make sure this file exists

// CREATE mood entry
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

    // Link mood entry to the user
    await User.findByIdAndUpdate(input.userId, {
      $push: { moodEntries: saved._id },
    });

    const result = formatMoodEntry(saved);

    console.log("[TRACKER] Mood entry saved:", result);

    return {
      success: true,
      message: "Mood entry recorded successfully",
      entry: result,
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

// FETCH mood entries for a specific user
export const getMoodEntries = async (userId: string): Promise<{
  success: boolean;
  message: string;
  entries: IMoodEntry[] | null;
}> => {
  try {
    const rawEntries = await MoodEntry.find({ userId }).sort({ createdAt: -1 });
    const entries = rawEntries.map(formatMoodEntry);

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

