auth.ts

original code
// File: server/src/utils/auth.ts

import jwt from "jsonwebtoken";


<--this code changed signed Token-->
export const signToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid token");
  }
};




changed code
// File: server/src/utils/auth.ts

import jwt from "jsonwebtoken";

const expiration = "2h";
<--this code signToken changed-->
//  Removed { data: payload }
export const signToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  return jwt.sign(payload, secret, { expiresIn: "2h" });
};



export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    console.error("JWT_SECRET_KEY is missing from environment variables!");
    throw new Error("Server misconfiguration: missing JWT secret");
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid token");
  }
};








server.ts
<--original code-->
// File: server/src/server.ts

import express, { Request } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import jwt from "jsonwebtoken";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { connectDB } from "./config/connections.js";

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context
const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { user: decoded };
  } catch {
    return { user: null };
  }
};

async function startServer() {
  await connectDB();

  const app = express();

  // Enable CORS before Apollo middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error("GraphQL Error:", formattedError);
      return formattedError;
    },
  });

  await server.start();

  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    }
  );
  }

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});






<--changed code -->
// File: server/src/server.ts

import express, { Request } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import jwt from "jsonwebtoken";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { connectDB } from "./config/connections.js";

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context <--this was updated/changed-->
const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { user: decoded }; // ✅ user now contains { id, username }
  } catch (err) {
    console.warn("❌ Invalid token:", err);
    return { user: null };
  }
};



async function startServer() {
  await connectDB();

  const app = express();

  // Enable CORS before Apollo middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error("GraphQL Error:", formattedError);
      return formattedError;
    },
  });

  await server.start();

  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    }
  );
  }

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});



resolvers.ts
<--oringinal code-->
// File: server/src/schema/resolvers.ts


import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import { JournalEntry, MoodEntry } from "../models/index.js";
import { createJournalEntry } from "../controllers/journalController.js";


import DateScalar from './scalars/DateScalar.js';

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

    // Update journal entry by ID + input (new resolver for separate `id`)
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
    updateMoodEntry: async (_parent, { id, mood, intensity, moodColor, note }, { user }) => {
  if (!user || !user._id) throw new Error("Not authenticated");

  const entry = await MoodEntry.findById(id);
  if (!entry) throw new Error("Mood entry not found");

  if (!entry.userId || !user._id) {
    throw new Error("Invalid user or entry data");
  }

  if (entry.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized to update this mood entry");
  }

  console.log('Updating Mood:', {
    id,
    mood,
    intensity,
    moodColor,
    note,
    entryUserId: entry?.userId,
    currentUserId: user?._id,
  });

  return await MoodEntry.findByIdAndUpdate(
    id,
    { mood, intensity, moodColor, note },
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






<--changed code-->
// File: server/src/schema/resolvers.ts


import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import { JournalEntry, MoodEntry } from "../models/index.js";
import { createJournalEntry } from "../controllers/journalController.js";


import DateScalar from './scalars/DateScalar.js';

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
  _id: user._id,
  username: user.username

,
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

    // Update journal entry by ID + input (new resolver for separate `id`)
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
    updateMoodEntry: async (_parent, { id, mood, intensity, moodColor, note }, { user }) => {
  if (!user || !user._id) throw new Error("Not authenticated");

  const entry = await MoodEntry.findById(id);
  if (!entry) throw new Error("Mood entry not found");

  if (!entry.userId || !user._id) {
    throw new Error("Invalid user or entry data");
  }

  if (entry.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized to update this mood entry");
  }

  console.log('Updating Mood:', {
    id,
    mood,
    intensity,
    moodColor,
    note,
    entryUserId: entry?.userId,
    currentUserId: user?._id,
  });

  return await MoodEntry.findByIdAndUpdate(
    id,
    { mood, intensity, moodColor, note },
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
