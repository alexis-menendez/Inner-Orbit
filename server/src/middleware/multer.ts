// File: server/src/middleware/multer.ts

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'moodtracker_videos',
    resource_type: 'video',
    format: ['mp4', 'mov', 'avi'],
  }),
});

const parser = multer({ storage });

export default parser;
