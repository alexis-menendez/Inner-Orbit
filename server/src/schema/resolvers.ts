// File: server/src/schema/resolvers.ts

import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import { JournalEntry, MoodEntry } from "../models/index.js";
import { createJournalEntry } from "../controllers/journalController";
import { getMoodColor } from "../utils/trackerColors.js";
import DateScalar from './date';

const resolvers: IResolvers = {
    Date: DateScalar,

// QUERIES

  Query: {

//USER

    // Fetch user by ID
    getUserById: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found.");
      return user;
    },

    // Authenticated user info
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user._id)
        .populate("moodEntries")
        .populate("journalEntries");
    },

// TRACKER

    // Fetch all mood entries for the current user
    getMoodEntries: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await MoodEntry.find({ user: user._id }).sort({ createdAt: -1 });
    },

    // Fetch moods by date for the current user
moodsByDates: async (
  _: any,
  { userId, dates }: { userId: string; dates: string[] },
  context
) => {
  if (!context.user) throw new Error("Not authenticated");

  const dateConditions = dates.map((dateStr) => {
    const normalizedDate = new Date(dateStr);
    normalizedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(normalizedDate);
    nextDay.setDate(normalizedDate.getDate() + 1);

    return {
      userId,
      date: { $gte: normalizedDate, $lt: nextDay },
    };
  });

  const results = await MoodEntry.find({ $or: dateConditions }).sort({ date: 1 });
  return results;
},


// JOURNAL

    // Fetch all journal entries for a specific user
    getJournalEntries: async (_: any, { userId }: { userId: string }) => {
      const entries = await JournalEntry.find({ userId }).sort({
        createdAt: -1,
      });
      return {
        success: true,
        message: "Journal entries fetched successfully",
        entries,
      };
    },

    // Fetch a single journal entry by its ID
    getJournalEntryById: async (_: any, { entryId }: { entryId: string }) => {
      try {
        const entry = await JournalEntry.findById(entryId);
        return entry || null;
      } catch (err) {
        console.error("Error fetching journal entry:", err);
        return null;
      }
    },

    // Get completed constellations for a user
    getCompletedConstellations: async (_: any, { userId }: { userId: string }) => {
      const entries = await JournalEntry.find({ userId });

      const count = entries.length;

      const CONSTELLATION_LIMITS = [9, 19, 32, 43, 54, 65]; // cumulative star counts
      const CONSTELLATION_NAMES = ["The Key", "The Candle", "The Sun", "The Spiral", "The Bridge", "The Seed"];

      let remaining = count;
      const completed: string[] = [];

      for (let i = 0; i < CONSTELLATION_LIMITS.length; i++) {
        if (remaining >= CONSTELLATION_LIMITS[i]) {
          completed.push(CONSTELLATION_NAMES[i]);
          remaining -= CONSTELLATION_LIMITS[i];
        } else {
          break;
        }
      }

      return {
        count,
        names: completed,
        message: "Constellation progress retrieved",
      };
    },
  },

// MUTATIONS
  Mutation: {

//USERS

    // Register a new user
    registerUser: async (
      _: any,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        dob,
      }: {
        username: string;
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        dob?: string;
      }
    ) => {
      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new Error("Username or email already taken.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        dob,
      });

      const token = signToken({ id: newUser._id, username: newUser.username });

      return {
        token,
        user: newUser,
        success: true,
        message: "Registration successful.",
      };
    },

    // User login
    loginUser: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      if (!username || !password) {
        throw new Error("Username and password are required.");
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Invalid credentials.");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid credentials.");
      }

      const token = signToken({
        id: user._id,
        username: user.username,
        isDev: user.isDev,
      });

      return {
        token,
        user,
      };
    },

// JOURNAL

    // Create a new journal entry
    createJournal: async (_: any, { input }: any) => {
      return await createJournalEntry(input);
    },

    // Update a journal entry
    updateJournal: async (_: any, { input }: any) => {
      try {
        const { id, title, content, mood } = input;

        const updated = await JournalEntry.findByIdAndUpdate(
          id,
          { $set: { title, content, mood } },
          { new: true, runValidators: true }
        );

        if (!updated) {
          return {
            success: false,
            message: "Journal entry not found",
            entry: null,
          };
        }

        return {
          success: true,
          message: "Journal entry updated successfully",
          entry: updated,
        };
      } catch (err) {
        console.error("Error updating journal entry:", err);
        return {
          success: false,
          message: "Failed to update journal entry",
          entry: null,
        };
      }
    },

    // Delete a journal entry
    deleteJournalEntry: async (_: any, { id }: { id: string }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const deleted = await JournalEntry.findOneAndDelete({ _id: id, userId: user._id });
      return !!deleted;
    },

// MOOD TRACKER

    // Add a mood entry
 addMoodEntry: async (_, { date, mood, intensity, moodColor, note, userId }) => {
  if (!userId) throw new Error("Missing userId");

  if (!mood) throw new Error("Mood is required");
  if (intensity === undefined) throw new Error("Intensity is required");
  if (intensity < 1 || intensity > 10) throw new Error("Intensity must be between 1 and 10");
  if (intensity % 1 !== 0) throw new Error("Intensity must be an integer");

  const entry = await MoodEntry.create({
    date,
    mood,
    intensity,
    moodColor,
    note,
    userId, // ✅ use directly from args
  });

  await User.findByIdAndUpdate(userId, {
    $push: { moodEntries: entry._id },
  });

  return entry;
},

    // Update a mood entry
    updateMoodEntry: async (_, { id, mood, intensity }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const updates: any = {};
      if (mood) {
        updates.mood = mood;
        updates.moodColor = getMoodColor(mood);
      }
      if (intensity !== undefined) {
        updates.intensity = intensity;
      }

      return await MoodEntry.findOneAndUpdate(
        { _id: id, user: user._id },
        updates,
        { new: true }
      );
    },

    // Delete a mood entry
    deleteMoodEntry: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      await MoodEntry.findOneAndDelete({ _id: id, user: user._id });
      return true;
    },
  },
};


export default resolvers;
