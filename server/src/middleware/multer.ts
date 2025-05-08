import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'moodtracker_videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi']
  }
});

const parser = multer({ storage });

export default parser;
