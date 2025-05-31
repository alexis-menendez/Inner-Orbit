// File: server/src/controllers/libraryController.ts

import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary.js';

export const getAllVideos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await cloudinary.search
      .expression('resource_type:video AND folder:Inner-Orbit')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    const videos = result.resources.map((video: any) => ({
      url: video.secure_url,
      thumbnail: video.preview_url || video.secure_url,
      public_id: video.public_id,
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
