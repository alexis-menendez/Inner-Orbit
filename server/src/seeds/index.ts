// File: server/src/seeds/index.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { seedUsers } from './user-seeds';
import { seedJournals } from './journal-seeds';
// import { seedMoods } from './mood-seeds';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await seedUsers();
    await seedJournals();
    // await seedMoods();

    console.log('🌱 Database seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
  }
})();
