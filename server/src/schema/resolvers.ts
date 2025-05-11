// File: server/src/schema/resolvers.ts

import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import { JournalEntry, MoodEntry } from "../models/index.js";
import { createJournalEntry } from "../controllers/journalController";

const resolvers: IResolvers = {
  Query: {
    getUserById: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found.");
      return user;
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user._id)
        .populate("moodEntries")
        .populate("journalEntries");
    },
    getMoodEntries: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await MoodEntry.find({ user: user._id }).sort({ createdAt: -1 });
    },

    // commenting out below 3 lines of code. I'm not deleting them because I'm not suer how the backend will work.
    //getJournalEntries: async (_, __, { user }) => {
    //   if (!user) throw new Error("Not authenticated");
    // return await JournalEntry.find({ user: user._id }).sort({ createdAt: -1 });
    //},

    //all journal entries for user
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

    getJournalEntryById: async (_: any, { entryId }: { entryId: string }) => {
      try {
        const entry = await JournalEntry.findById(entryId);
        return entry || null;
      } catch (err) {
        console.error("Error fetching journal entry:", err);
        return null;
      }
    },
  },
  // Mutation resolvers
  Mutation: {
    registerUser: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
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
      });

      const token = signToken({ id: newUser._id, username: newUser.username });
      return { token };
    },

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
      return { token };
    },

    createJournal: async (_: any, { input }: any) => {
      return await createJournalEntry(input);
    },

  addMoodEntry: async (_, { mood, intensity, color }, { user }) => {
    if (!user) throw new Error("Not authenticated");
    const entry = await MoodEntry.create({
      mood,
      intensity,
      color,
      user: user._id,
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { moodEntries: entry._id },
    });
    return entry;
  },

  updateMoodEntry: async (_, { id, ...updates }, { user }) => {
    if (!user) throw new Error("Not authenticated");
    return await MoodEntry.findOneAndUpdate(
      { _id: id, user: user._id },
      updates,
      { new: true }
    );
  },

  deleteMoodEntry: async (_, { id }, { user }) => {
    if (!user) throw new Error("Not authenticated");
    await MoodEntry.findOneAndDelete({ _id: id, user: user._id });
    return true;
  },
}
};

export default resolvers;
