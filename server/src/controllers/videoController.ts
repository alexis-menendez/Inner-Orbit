// File: server/src/controllers/videoController.ts

import type { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary.js';
import Video from '../models/Video.js';

interface FileRequest extends Request {
  file: Express.Multer.File;
  user: {
    _id: string;
    username: string;
    isDev?: boolean;
  };
}

export const uploadVideo = async (req: FileRequest, res: Response): Promise<Response | void> => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'video',
      folder: 'moodtracker_videos',
    });

    const newVideo = new Video({
      title: req.body.title || result.original_filename,
      url: result.secure_url,
      public_id: result.public_id,
      uploadedBy: req.user._id,
    });

    await newVideo.save();

    return res.status(201).json(newVideo);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown server error' });
  }
};

export const getAllVideos = async (_req: Request, res: Response): Promise<Response | void> => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.json(videos);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown server error' });
  }
};
