// File: server/scripts/clearUsers.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User'; 

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'your-fallback-mongo-uri';

mongoose.connect(MONGO_URI).then(async () => {
  const result = await User.deleteMany({});
  console.log(`Deleted ${result.deletedCount} users.`);
  mongoose.connection.close();
});
