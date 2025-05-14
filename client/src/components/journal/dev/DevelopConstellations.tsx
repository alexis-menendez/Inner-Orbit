// File: client/src/components/journal/dev/DevelopConstellations.tsx

import React, { useState } from 'react';
import { CONSTELLATIONS, StarPoint, Constellation } from '../ConstellationLogic';
import styles from '../../../assets/css/journal/Stars.module.css';

const DevelopConstellations: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ background: 'black', minHeight: '100vh', padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Constellation Develop View</h1>

      {CONSTELLATIONS.map((constellation: Constellation, index: number) => {
        const canvasUnits = 100;
        const pixelHeight = 500;

        return (
          <div key={index} style={{ marginBottom: '4rem', border: '1px solid #444', padding: '1rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{constellation.name}</h2>
            <div
              style={{
                position: 'relative',
                backgroundColor: '#000',
                height: `${pixelHeight}px`,
                width: '100%',
                border: '1px solid white',
                borderRadius: '8px',
                overflow: 'visible'
              }}
            >
              <svg
                viewBox={`0 0 ${canvasUnits} ${canvasUnits}`}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0
                }}
              >
                {/* Add filter definition */}
                <defs>
                  <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g transform="translate(-10, -10)">
                  {/* Constellation lines */}
                  {constellation.connections.map(([from, to], i) => {
                    const start: StarPoint = constellation.stars[from];
                    const end: StarPoint = constellation.stars[to];
                    return (
                      <line
                        key={`line-${i}`}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke="white"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}

                  {/* Stars with hover interaction */}
                  {constellation.stars.map((star: StarPoint, i: number) => (
                  <circle
                    key={`star-${i}`}
                    cx={star.x}
                    cy={star.y}
                    r={star.size ?? 1.5}
                    className={`${styles.star} ${hoveredIndex === i ? styles['star-hover'] : ''}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <title>{`Star ${i + 1}`}</title>
                  </circle>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DevelopConstellations;
