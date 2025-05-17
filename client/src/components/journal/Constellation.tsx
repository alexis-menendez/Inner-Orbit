// File: client/src/components/journal/Constellation.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONSTELLATIONS } from './ConstellationLogic';
import styles from '../../assets/css/journal/Stars.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import StarBackground from '../common/StarBackground';

const Constellation: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <StarBackground starCount={80} />

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
          <g key={`star-group-${i}`}>
            <circle
              cx={star.x}
              cy={star.y}
              r={star.size ?? 1}
              className={`${styles.star} ${hoveredIndex === i ? styles['star-hover'] : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/journal/entry/${index}-${i}`)}
              style={{ pointerEvents: 'all' }}
            />
            {hoveredIndex === i && (
              <text
                x={star.x + 1}
                y={star.y - 1}
                fill="white"
                fontSize="2"
                style={{ pointerEvents: 'none' }}
              >
                Entry {i + 1}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Constellation;
