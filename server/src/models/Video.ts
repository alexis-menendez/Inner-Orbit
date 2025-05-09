// File: server/src/models/Video.ts

import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  public_id: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Video', videoSchema);
