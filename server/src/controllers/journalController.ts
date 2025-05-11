// File: server/src/controllers/journalController.ts

import JournalEntry, { IJournalEntry } from "../models/Journal";
import { JournalInput } from "../models/Journal";

export const createJournalEntry = async (input: JournalInput) => {
  console.log("Recording journal entry:", input);

  try {
    const newEntry = new JournalEntry({
      userId: input.userId,
      title: input.title,
      content: input.content,
      mood: input.mood || null,
    });

    const result = await newEntry.save();
    console.log("Journal entry saved:", result);

    return {
      success: true,
      message: "Journal entry recorded successfully",
      entry: newEntry,
    };
  } catch (error) {
    console.error("Error recording journal entry:", error);
    return {
      success: false,
      message: "Failed to record journal entry",
      entry: null,
    };
  }
};

export const getJournalEntries = async (): Promise<{
  success: boolean;
  message: string;
  entries: IJournalEntry[] | null;
}> => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 }); // newest first
    return {
      success: true,
      message: "Journal entries fetched successfully",
      entries,
    };
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return {
      success: false,
      message: "Failed to fetch journal entries",
      entries: null,
    };
  }
};
