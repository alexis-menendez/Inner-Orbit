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
        if (isCancelled) return;

        if (!paused) {
          const count =
            ['extraSmall', 'extraSmallTwo', 'small', 'smallTwo', 'default', 'defaultTwo', 'medium'].includes(starType)
              ? 2 + Math.floor(Math.random() * 2)
              : 1;

          const newStars: ReactElement[] = [];

          for (let i = 0; i < count; i++) {
            const top = Math.random() * 80;
            const left = 20 + Math.random() * 60;

            const className =
              starType === 'extraSmall'
                ? styles.shootingStarExtraSmall
                : starType === 'extraSmallTwo'
                ? styles.shootingStarExtraSmallTwo
                : starType === 'small'
                ? styles.shootingStarSmall
                : starType === 'smallTwo'
                ? styles.shootingStarSmallTwo
                : starType === 'default'
                ? styles.shootingStar
                : starType === 'defaultTwo'
                ? styles.shootingStarTwo
                : starType === 'medium'
                ? styles.shootingStarMed
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

          setter((prev) => [...prev.slice(-(maxStars - count + 1)), ...newStars]);
        }

        const nextDelay = frequency * (0.5 + Math.random());
        setTimeout(loop, nextDelay);
      };

      loop();
    };

    // === Loop counts ===
    const NUM_EXTRA_SMALL_LOOPS = 1;
    const NUM_EXTRA_SMALL_TWO_LOOPS = 1;
    const NUM_SMALL_LOOPS = 1;
    const NUM_SMALL_TWO_LOOPS = 1;
    const NUM_DEFAULT_LOOPS = 1;
    const NUM_DEFAULT_TWO_LOOPS = 1;
    const NUM_MEDIUM_LOOPS = 1;
    const NUM_LARGE_LOOPS = 1;
    const NUM_EXTRA_LARGE_LOOPS = 1;

    for (let i = 0; i < NUM_EXTRA_SMALL_LOOPS; i++) createBurstLoop('extraSmall', i);
    for (let i = 0; i < NUM_EXTRA_SMALL_TWO_LOOPS; i++) createBurstLoop('extraSmallTwo', i);
    for (let i = 0; i < NUM_SMALL_LOOPS; i++) createBurstLoop('small', i);
    for (let i = 0; i < NUM_SMALL_TWO_LOOPS; i++) createBurstLoop('smallTwo', i);
    for (let i = 0; i < NUM_DEFAULT_LOOPS; i++) createBurstLoop('default', i);
    for (let i = 0; i < NUM_DEFAULT_TWO_LOOPS; i++) createBurstLoop('defaultTwo', i);
    for (let i = 0; i < NUM_MEDIUM_LOOPS; i++) createBurstLoop('medium', i);
    for (let i = 0; i < NUM_LARGE_LOOPS; i++) createBurstLoop('large', i);
    for (let i = 0; i < NUM_EXTRA_LARGE_LOOPS; i++) createBurstLoop('extraLarge', i);

    return () => {
      isCancelled = true;
    };
  }, [frequency, maxStars]);

  return (
    <>
      {extraSmallStars}
      {extraSmallStarsTwo}
      {smallStars}
      {smallStarsTwo}
      {defaultStars}
      {defaultStarsTwo}
      {mediumStars}
      {largeStars}
      {extraLargeStars}
    </>
  );
};

export default ShootingStar;
