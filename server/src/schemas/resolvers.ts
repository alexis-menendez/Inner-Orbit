import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import Entry from '../models/Entry.js';
import { getMoodColor } from '../utils/moodColors.js';

export const resolvers = {
  Query: {
    getCurrentUser: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user.id);
    },

    getAllVideos: async () => {
      return await Video.find().populate('uploadedBy').sort({ createdAt: -1 });
    },

    getEntries: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await Entry.find({ author: user.id }).sort({ createdAt: -1 }).populate('author');
    },
  },

  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already in use');

      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },

    uploadVideo: async (_, { title, video }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const { createReadStream } = await video;
      const stream = createReadStream();

      const uploadResult = await new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          { resource_type: 'video', folder: 'moodtracker_videos' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.pipe(cloudinaryStream);
      });

      const newVideo = new Video({
        title,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        uploadedBy: user.id,
        createdAt: new Date()
      });

      await newVideo.save();
      return await newVideo.populate('uploadedBy');
    },

    createEntry: async (_, { mood, content }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const color = getMoodColor(mood);
      const entry = new Entry({
        mood,
        color,
        content,
        author: user.id,
        createdAt: new Date()
      });
      await entry.save();
      return await entry.populate('author');
    },

    updateEntry: async (_, { id, mood, content }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const entry = await Entry.findById(id);
      if (!entry || entry.author.toString() !== user.id) {
        throw new Error('Entry not found or unauthorized');
      }

      if (mood) {
        entry.mood = mood;
        entry.color = getMoodColor(mood);
      }
      if (content) entry.content = content;
      await entry.save();
      return await entry.populate('author');
    },

    deleteEntry: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const entry = await Entry.findById(id);
      if (!entry || entry.author.toString() !== user.id) {
        throw new Error('Entry not found or unauthorized');
      }
      await entry.deleteOne();
      return true;
    }
  }
};
