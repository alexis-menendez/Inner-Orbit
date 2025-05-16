// File: server/src/seeds/journal-seeds.ts

import fs from 'fs';
import path from 'path';
import JournalEntry from '../models/Journal.js';
import User from '../models/User.js';

export const seedJournals = async () => {
  const filePath = path.join(__dirname, 'journal.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const journalData = JSON.parse(raw); // { WhimsyWoods: [...], StarSeeker: [...] }

  const usernames = Object.keys(journalData);

  for (const username of usernames) {
    const user = await User.findOne({ username });

    if (!user) {
      console.warn(`⚠️ User "${username}" not found. Skipping journal entries.`);
      continue;
    }

    const entries = journalData[username].map((entry: any) => ({
      ...entry,
      userId: user._id,
    }));

    await JournalEntry.deleteMany({ userId: user._id });
    await JournalEntry.insertMany(entries);

    console.log(`✅ Seeded ${entries.length} journal entries for ${username}`);
  }
};
