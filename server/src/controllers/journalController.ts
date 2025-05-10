// File: server/src/controllers/journalController.ts

import { v4 as uuidv4 } from "uuid";

type JournalInput = {
  title: string;
  content: string;
  mood?: string;
};

export const createJournalEntry = async (input: JournalInput) => {
  console.log("Recording journal entry:", input);

  // Simulated DB write
  const newEntry = {
    id: uuidv4(),
    title: input.title,
    content: input.content,
    mood: input.mood || null,
    createdAt: new Date().toISOString(),
  };

  // Example success response
  return {
    success: true,
    message: "Journal entry recorded successfully",
    entry: newEntry,
  };
};

// Leave this for Blake to do
