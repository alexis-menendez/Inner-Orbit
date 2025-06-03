// File: File: client/src/pages/Library.tsx

import React, { useEffect, useState } from 'react';
import pageStyles from '../assets/css/dashboard/Dashboard.module.css';
import styles from '../assets/css/library/Library.module.css';

type Video = {
  url: string;
  thumbnail: string;
  public_id: string;
};

const Library: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/library/videos');
        const data = await res.json();
        setVideos(data.videos);
      } catch (err) {
        console.error('Failed to load videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-12 relative z-10 ${pageStyles.dashboardPage}`}>
      <div className="w-full sm:w-3/4 cosmic-panel">
        {/* Music Videos Section */}
        <h2 className={styles.libraryTitle}>Music Videos</h2>
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <video key={video.public_id} controls className={styles.videoPlayer}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        )}

        <hr className={styles.sectionDivider} />

        {/* Coming Soon Sections */}
        <h2 className={styles.libraryTitle}>Guided Meditations</h2>
        <p className={styles.comingSoon}>Coming Soon!</p>

        <hr className={styles.sectionDivider} />

        <h2 className={styles.libraryTitle}>Yoga Videos</h2>
        <p className={styles.comingSoon}>Coming Soon!</p>

        <hr className={styles.sectionDivider} />

        <h2 className={styles.libraryTitle}>Breathwork & Body Awareness</h2>
        <p className={styles.comingSoon}>Coming Soon!</p>

        <hr className={styles.sectionDivider} />

        <h2 className={styles.libraryTitle}>Soundscapes for Sleep</h2>
        <p className={styles.comingSoon}>Coming Soon!</p>
      </div>
    </div>
  );
};

export default Library;
