// File: server/src/schema/resolvers.ts


import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import { JournalEntry, MoodEntry } from "../models/index.js";
import { createJournalEntry } from "../controllers/journalController.js";
import DateScalar from './scalars/DateScalar.js';
import { addMoodEntry as addMoodEntryController } from '../controllers/trackerController.js';

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
    getMoodEntries: async (_: any, { userId }: { userId?: string }, context) => {
      const resolvedUserId = userId || context.user?._id;

      if (!resolvedUserId) {
        return {
          success: false,
          message: "User not authenticated.",
          entries: [],
        };
      }

      try {
        const entries = await MoodEntry.find({ user: resolvedUserId }).sort({ createdAt: -1 });

        return {
          success: true,
          message: "Mood entries fetched successfully.",
          entries,
        };
      } catch (error) {
        console.error("Error fetching mood entries:", error);
        return {
          success: false,
          message: "Failed to fetch mood entries.",
          entries: [],
        };
      }
    },

    // Fetch moods by date for the current user
    moodsByDates: async (
      _: any,
      { userId, dates }: { userId?: string; dates: string[] },
      context
    ) => {
      const resolvedUserId = userId || context.user?._id;

      if (!resolvedUserId) throw new Error("Not authenticated");

      const dateConditions = dates.map((dateStr) => {
        const normalizedDate = new Date(dateStr);
        normalizedDate.setHours(0, 0, 0, 0);

        const nextDay = new Date(normalizedDate);
        nextDay.setDate(normalizedDate.getDate() + 1);

        return {
          user: resolvedUserId,
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
      try {
        console.log("[LOGIN] Attempt:", { username });

        const user = await User.findOne({ username });

        if (!user) {
          console.log("[LOGIN] User not found:", username);
          throw new Error("Invalid credentials.");
        }

        console.log("[LOGIN] Found user:", {
          id: user._id,
          passwordHash: user.password,
        });

        const isValid = await bcrypt.compare(password, user.password);
        console.log("[LOGIN] Password valid:", isValid);

        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        const token = signToken({
          id: user._id,
          username: user.username,
          isDev: user.isDev,
        });

        console.log("[LOGIN] Success. Token issued.");

        return {
          token,
          user,
        };
      } catch (error) {
        console.error("[LOGIN] Error during login:", error);
        throw error;
      }
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

    // Update journal entry by ID + input 
    updateJournalEntry: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const updated = await JournalEntry.findByIdAndUpdate(
          id,
          { $set: input },
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
          message: "Journal entry updated",
          entry: updated,
        };
      } catch (error) {
        console.error("Error updating journal entry:", error);
        return {
          success: false,
          message: "Server error updating entry",
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

// TRACKER

// Fetch all mood entries for the current user
getMoodEntries: async (_: any, { userId }: { userId?: string }, context) => {
  const resolvedUserId = userId || context.user?._id;

  if (!resolvedUserId) {
    return {
      success: false,
      message: "User not authenticated.",
      entries: [],
    };
  }

  try {
    const entries = await MoodEntry.find({ userId: resolvedUserId }).sort({ createdAt: -1 });

    return {
      success: true,
      message: "Mood entries fetched successfully.",
      entries,
    };
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return {
      success: false,
      message: "Failed to fetch mood entries.",
      entries: [],
    };
  }
},

// Fetch moods by date for the current user
moodsByDates: async (
  _: any,
  { userId, dates }: { userId?: string; dates: string[] },
  context
) => {
  const resolvedUserId = userId || context.user?._id;

  if (!resolvedUserId) throw new Error("Not authenticated");

  const dateConditions = dates.map((dateStr) => {
    const normalizedDate = new Date(dateStr);
    normalizedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(normalizedDate);
    nextDay.setDate(normalizedDate.getDate() + 1);

    return {
      userId: resolvedUserId,
      date: { $gte: normalizedDate, $lt: nextDay },
    };
  });

  const results = await MoodEntry.find({ $or: dateConditions }).sort({ date: 1 });
  return results;
},

// Add a mood entry 
addMoodEntry: async (_: any, { input }: any) => {
  if (!input.userId) {
    console.error("[TRACKER] Missing userId in input.");
    return {
      success: false,
      message: "User ID is required.",
      entry: null,
    };
  }

  try {
    if (!input.date || isNaN(new Date(input.date).getTime())) {
      console.error("Invalid or missing date:", input.date);
      return {
        success: false,
        message: "Invalid or missing date.",
        entry: null,
      };
    }

    const result = await addMoodEntryController(input);

    if (!result.entry) {
      return {
        success: false,
        message: "Entry was not created.",
        entry: null,
      };
    }

    return {
      success: true,
      message: "Mood entry created successfully.",
      entry: result.entry,
    };
  } catch (error) {
    console.error("Error creating mood entry:", error);
    return {
      success: false,
      message: "Failed to create mood entry.",
      entry: null,
    };
  }
},

// Update a mood entry 
updateMoodEntry: async (_: any, { id, input }: { id: string; input: any }, { user }) => {
  const resolvedUserId = user?._id;

  if (!resolvedUserId) {
    return {
      success: false,
      message: "Not authenticated.",
      entry: null,
    };
  }

  try {
    const entry = await MoodEntry.findById(id);

    if (!entry) {
      return {
        success: false,
        message: "Mood entry not found.",
        entry: null,
      };
    }

    if (entry.userId.toString() !== resolvedUserId.toString()) {
      return {
        success: false,
        message: "Unauthorized to update this mood entry.",
        entry: null,
      };
    }

    const updated = await MoodEntry.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    );

    return {
      success: true,
      message: "Mood entry updated successfully.",
      entry: updated,
    };
  } catch (error) {
    console.error("Error updating mood entry:", error);
    return {
      success: false,
      message: "Server error updating entry.",
      entry: null,
    };
  }
},

// Delete a mood entry
deleteMoodEntry: async (_: any, { id }: { id: string }, { user }) => {
  if (!user) throw new Error("Not authenticated");

  const deleted = await MoodEntry.findOneAndDelete({ _id: id, userId: user._id });
  return !!deleted;
},
},
};  
export default resolvers;