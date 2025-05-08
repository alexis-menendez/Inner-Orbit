import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load variables from .env

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 5000;

