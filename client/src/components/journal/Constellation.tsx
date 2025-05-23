// File: client/src/components/journal/Constellation.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONSTELLATIONS } from './ConstellationLogic';
import styles from '../../assets/css/journal/Stars.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import StarBackground from '../common/StarBackground';
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../../graphql/queries';
import { useAuth } from '../../context/authContext';

const Constellation: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { user } = useAuth();
  const { data } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const entries = data?.getJournalEntries?.entries || [];

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

  // Compute base index for this constellation in the overall journal entry list
  const baseEntryIndex = CONSTELLATIONS.slice(0, constellationIndex)
    .reduce((acc, c) => acc + c.stars.length, 0);

  // Count how many stars in this constellation have actual entries
  const entriesInConstellation = entries.slice(
    baseEntryIndex,
    baseEntryIndex + constellation.stars.length
  );

  // Dynamically determine max Y for visible stars
  const activeStars = constellation.stars.slice(0, entriesInConstellation.length);
  const maxY = Math.max(...activeStars.map(star => star.y));
  const viewBoxHeight = Math.ceil(maxY + 5); // add padding

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
        viewBox={`0 0 100 ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Render only valid connections between existing entries */}
        {constellation.connections.map(([start, end], idx) => {
          if (
            start < entriesInConstellation.length &&
            end < entriesInConstellation.length
          ) {
            const a = constellation.stars[start];
            const b = constellation.stars[end];
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
          }
          return null;
        })}

        {/* Render stars with entries */}
        {entriesInConstellation.map((entry: { title: string }, i: number) => {
          const star = constellation.stars[i];
          const entryIndex = baseEntryIndex + i;

          return (
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
                <foreignObject
                  x={Math.min(star.x + 1, 85)}
                  y={Math.max(star.y - 5, 0)}
                  width={40}
                  height={80}
                  style={{ overflow: 'visible', pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      fontSize: '1.5px',
                      color: 'white',
                      background: 'rgba(60, 20, 80, 0.9)',
                      padding: '1px 2px',
                      borderRadius: '0.5vw',
                      wordWrap: 'break-word',
                      maxWidth: '50%',
                      lineHeight: '1.2',
                    }}
                  >
                    {entry.title}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Constellation;

