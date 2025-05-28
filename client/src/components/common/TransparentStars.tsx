// File: client/src/components/common/TransparentStars.tsx

import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/common/TransparentStars.module.css';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const TransparentStars: React.FC<{ starCount?: number }> = ({ starCount = 100 }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 2 + 1.5, 
        delay: Math.random() * 4,          
      }));
    };

    setStars(generateStars());
  }, [starCount]);

return (
  <div className={styles['star-wrapper']}>
    <div className={styles['background-gradient']} /> 
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
}

export default TransparentStars;
