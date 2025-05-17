// File: server/scripts/clearUsers.ts

// This script clears all users from the database. 
// It is intended to be run in a development environment only.
// CHECK WITH EVERYONE BEFORE RUNNING THIS SCRIPT.

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
