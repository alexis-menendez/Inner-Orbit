import React, { useEffect, useState, ReactElement } from 'react';
import styles from '../../assets/css/common/ShootingStar.module.css';

interface ShootingStarProps {
  frequency?: number;
  maxStars?: number;
}

const ShootingStar: React.FC<ShootingStarProps> = ({
  frequency = 2000,
  maxStars = 10,
}) => {
  const [smallStars, setSmallStars] = useState<ReactElement[]>([]);
  const [largeStars, setLargeStars] = useState<ReactElement[]>([]);
  const [extraLargeStars, setExtraLargeStars] = useState<ReactElement[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const NUM_SMALL_LOOPS = 3;
    const NUM_LARGE_LOOPS = 2;
    const NUM_EXTRA_LARGE_LOOPS = 1;

    const createBurstLoop = (
      starType: 'small' | 'large' | 'extraLarge',
      loopId: number
    ) => {
      const loop = () => {
        if (isCancelled) return;

        const count =
          starType === 'small'
            ? 2 + Math.floor(Math.random() * 3)
            : 1 + Math.floor(Math.random() * 2);

        const newStars: ReactElement[] = [];

        for (let i = 0; i < count; i++) {
          const top = Math.random() * 80;
          const left = 20 + Math.random() * 60;

          const className =
            starType === 'small'
              ? styles.shootingStar
              : starType === 'large'
              ? styles.shootingStarLarge
              : styles.shootingStarExtraLarge;

          newStars.push(
            <div
              key={`${starType}-${loopId}-${Date.now()}-${i}`}
              className={className}
              style={{ top: `${top}%`, left: `${left}%` }}
            />
          );
        }

        if (starType === 'small') {
          setSmallStars((prev) => [
            ...prev.slice(-(maxStars - count + 1)),
            ...newStars,
          ]);
        } else if (starType === 'large') {
          setLargeStars((prev) => [
            ...prev.slice(-(maxStars - count + 1)),
            ...newStars,
          ]);
        } else {
          setExtraLargeStars((prev) => [
            ...prev.slice(-(maxStars - count + 1)),
            ...newStars,
          ]);
        }

        const nextDelay = frequency * (0.5 + Math.random());
        setTimeout(loop, nextDelay);
      };

      loop();
    };

    for (let i = 0; i < NUM_SMALL_LOOPS; i++) {
      createBurstLoop('small', i);
    }

    for (let i = 0; i < NUM_LARGE_LOOPS; i++) {
      createBurstLoop('large', i);
    }

    for (let i = 0; i < NUM_EXTRA_LARGE_LOOPS; i++) {
      createBurstLoop('extraLarge', i);
    }

    return () => {
      isCancelled = true;
    };
  }, [frequency, maxStars]);

  return (
    <>
      {smallStars}
      {largeStars}
      {extraLargeStars}
    </>
  );
};

export default ShootingStar;
