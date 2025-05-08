import cloudinary from '../config/cloudinary.js';
import Video from '../models/Video.js';

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'video',
      folder: 'moodtracker_videos'
    });

    const newVideo = new Video({
      title: req.body.title || result.original_filename,
      url: result.secure_url,
      public_id: result.public_id,
      uploadedBy: req.user.id
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
