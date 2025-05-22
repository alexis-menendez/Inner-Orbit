// File: server/src/controllers/userController.ts

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/auth.js';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = signToken({ id: newUser._id, username: newUser.username });
    return res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal server error.' }); 
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = signToken({ id: user._id, username: user.username, isDev: user.isDev });
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' }); 
  }
};

// This is a test to see if it will enable me to use seeded users

import seedUsers from '../seeds/user-seeds.js';

export const seedUserAccounts = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (token !== process.env.SEED_TOKEN) {
    return res.status(403).json({ message: 'Unauthorized seed request' });
  }

  try {
    await seedUsers(); 
    return res.status(200).json({ message: 'Users successfully seeded' });
  } catch (err: any) {
    console.error('Seeding error:', err);
    return res.status(500).json({ message: 'Seeding failed', error: err.message });
  }
};

