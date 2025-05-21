// File: server/src/seeds/index.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { seedUsers } from './user-seeds.js';

// Commented Out: // @ts-expect-error: TS doesn't allow `.ts` extensions unless noEmit is true
// import { seedUsers } from './user-seeds.ts';

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
    // await seedMoods();

    console.log('🌱 Database seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
  }
})();
