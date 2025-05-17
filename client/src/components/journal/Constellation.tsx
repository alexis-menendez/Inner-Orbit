// File: client/src/components/journal/Constellation.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONSTELLATIONS } from './ConstellationLogic';
import styles from '../../assets/css/journal/Stars.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css'; // Import the button styles

const Constellation: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();

  // Parse and validate the index
  const constellationIndex = Number(index);
  const isValidIndex =
    index !== undefined &&
    !isNaN(constellationIndex) &&
    constellationIndex >= 0 &&
    constellationIndex < CONSTELLATIONS.length;

  if (!isValidIndex) {
    return <div className={styles.sky}>Constellation not found</div>;
  }

  const constellation = CONSTELLATIONS[constellationIndex];

  return (
    <div className={styles.sky}>
      <button
        onClick={() => navigate(-1)}
        className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.spaced}`}
      >
        ← Back to Journal
      </button>

      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
        {constellation.name}
      </h2>

      <svg
        className={styles.constellationSVG}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {constellation.connections.map(([start, end], idx) => {
          const a = constellation.stars[start];
          const b = constellation.stars[end];
          if (!a || !b) return null;
          return (
            <line
              key={`line-${idx}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="white"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {constellation.stars.map((star, i) => (
          <circle
            key={`star-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.size ?? 1}
            className={styles.star}
          />
        ))}
      </svg>
    </div>
  );
};

export default Constellation;
