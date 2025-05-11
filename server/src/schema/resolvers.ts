// File: server/src/schema/resolvers.ts

import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User";
import { signToken } from "../utils/auth";
import { createJournalEntry } from "../controllers/journalController";
import IJournalEntry from "../models/Journal";

const resolvers: IResolvers = {
  Query: {
    getUserById: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found.");
      return user;
    },

    //all journal entries for user
    getJournalEntries: async (_: any, { userId }: { userId: string }) => {
      const entries = await IJournalEntry.find({ userId }).sort({
        createdAt: -1,
      });
      return {
        success: true,
        message: "Journal entries fetched successfully",
        entries,
      };
    },
  },

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
  },
};

export default resolvers;
