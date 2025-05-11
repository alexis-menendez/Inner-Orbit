// File: server/src/config/connections.ts

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri); 

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('MongoDB connection error: unknown error');
    }
    process.exit(1);
  }
};

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const PORT = process.env.PORT || 5000;
