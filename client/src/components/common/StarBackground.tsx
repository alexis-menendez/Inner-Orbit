// File: client/src/components/common/StarBackground.tsx

import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/journal/Stars.module.css';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const StarBackground: React.FC<{ starCount?: number }> = ({ starCount = 100 }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 2 + 1.5, // 1.5s to 3.5s
        delay: Math.random() * 4,          // 0s to 4s
      }));
    };

    setStars(generateStars());
  }, [starCount]);

  return (
    <div className={styles['star-wrapper']}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles['star-background']}
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
