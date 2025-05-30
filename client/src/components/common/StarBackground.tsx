// File: client/src/components/common/StarBackground.tsx

import React, { useEffect, useState, ReactElement } from 'react';
import styles from '../../assets/css/journal/Stars.module.css'; // For twinkling stars
import shootingStyles from '../../assets/css/common/ShootingStar.module.css'; // For shooting stars

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

  const [paused, setPaused] = useState(false);
  const [extraSmallStars, setExtraSmallStars] = useState<ReactElement[]>([]);
  const [extraSmallStarsTwo, setExtraSmallStarsTwo] = useState<ReactElement[]>([]);
  const [smallStars, setSmallStars] = useState<ReactElement[]>([]);
  const [smallStarsTwo, setSmallStarsTwo] = useState<ReactElement[]>([]);
  const [defaultStars, setDefaultStars] = useState<ReactElement[]>([]);
  const [defaultStarsTwo, setDefaultStarsTwo] = useState<ReactElement[]>([]);
  const [mediumStars, setMediumStars] = useState<ReactElement[]>([]);
  const [largeStars, setLargeStars] = useState<ReactElement[]>([]);
  const [extraLargeStars, setExtraLargeStars] = useState<ReactElement[]>([]);

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

  useEffect(() => {
    let isCancelled = false;

    const clearAllStars = () => {
      setExtraSmallStars([]);
      setExtraSmallStarsTwo([]);
      setSmallStars([]);
      setSmallStarsTwo([]);
      setDefaultStars([]);
      setDefaultStarsTwo([]);
      setMediumStars([]);
      setLargeStars([]);
      setExtraLargeStars([]);
    };

    const runAnimationCycle = () => {
      setPaused(false);
      setTimeout(() => {
        setPaused(true);
        clearAllStars();
        if (!isCancelled) {
          setTimeout(runAnimationCycle, 2 * 60 * 1000);
        }
      }, 60 * 1000);
    };

    runAnimationCycle();

    const createBurstLoop = (
      starType:
        | 'extraSmall'
        | 'extraSmallTwo'
        | 'small'
        | 'smallTwo'
        | 'default'
        | 'defaultTwo'
        | 'medium'
        | 'large'
        | 'extraLarge',
      loopId: number
    ) => {
      const loop = () => {
        if (isCancelled || paused) return;

        const count =
          ['extraSmall', 'extraSmallTwo', 'small', 'smallTwo', 'default', 'defaultTwo', 'medium'].includes(starType)
            ? 1 + Math.floor(Math.random() * 1.5)
            : 1;

        const newStars: ReactElement[] = [];
        for (let i = 0; i < count; i++) {
          const top = Math.random() * 80;
          const left = 20 + Math.random() * 60;
          const className =
            shootingStyles[
              starType === 'extraSmall'
                ? 'shootingStarExtraSmall'
                : starType === 'extraSmallTwo'
                ? 'shootingStarExtraSmallTwo'
                : starType === 'small'
                ? 'shootingStarSmall'
                : starType === 'smallTwo'
                ? 'shootingStarSmallTwo'
                : starType === 'default'
                ? 'shootingStar'
                : starType === 'defaultTwo'
                ? 'shootingStarTwo'
                : starType === 'medium'
                ? 'shootingStarMed'
                : starType === 'large'
                ? 'shootingStarLarge'
                : 'shootingStarExtraLarge'
            ];

          newStars.push(
            <div
              key={`${starType}-${loopId}-${Date.now()}-${i}`}
              className={className}
              style={{ top: `${top}%`, left: `${left}%` }}
            />
          );
        }

        const setter =
          starType === 'extraSmall'
            ? setExtraSmallStars
            : starType === 'extraSmallTwo'
            ? setExtraSmallStarsTwo
            : starType === 'small'
            ? setSmallStars
            : starType === 'smallTwo'
            ? setSmallStarsTwo
            : starType === 'default'
            ? setDefaultStars
            : starType === 'defaultTwo'
            ? setDefaultStarsTwo
            : starType === 'medium'
            ? setMediumStars
            : starType === 'large'
            ? setLargeStars
            : setExtraLargeStars;

        setter((prev) => [...prev.slice(-(10 - count + 1)), ...newStars]);

        const nextDelay = 2000 * (1.5 + Math.random() * 1.5);
        setTimeout(loop, nextDelay);
      };

      loop();
    };

    for (let i = 0; i < 1; i++) {
      createBurstLoop('extraSmall', i);
      createBurstLoop('extraSmallTwo', i);
      createBurstLoop('small', i);
      createBurstLoop('smallTwo', i);
      createBurstLoop('default', i);
      createBurstLoop('defaultTwo', i);
      createBurstLoop('medium', i);
      createBurstLoop('large', i);
      createBurstLoop('extraLarge', i);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

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
      {extraSmallStars}
      {extraSmallStarsTwo}
      {smallStars}
      {smallStarsTwo}
      {defaultStars}
      {defaultStarsTwo}
      {mediumStars}
      {largeStars}
      {extraLargeStars}
    </div>
  );
};

export default StarBackground;
