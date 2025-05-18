// File: server/src/utils/cloudinary.ts

import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Missing required Cloudinary environment variables.');
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

type CloudinaryVideoResource = {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: {
      title?: string;
      description?: string;
    };
  };
};

export const getVideoLibrary = async () => {
  const result = await cloudinary.search
    .expression('resource_type:video AND folder:video-library')
    .sort_by('created_at', 'desc')
    .max_results(30)
    .execute();

  return result.resources.map((video: CloudinaryVideoResource) => ({
    publicId: video.public_id,
    url: video.secure_url,
    thumbnail: cloudinary.url(video.public_id + '.jpg', {
      resource_type: 'video',
      format: 'jpg',
      width: 300,
      height: 200,
      crop: 'fill',
    }),
    title: video.context?.custom?.title || video.public_id,
    description: video.context?.custom?.description || '',
  }));
};

export default cloudinary;
