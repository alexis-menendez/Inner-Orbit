// File: client/src/components/journal/dev/DevelopConstellations.tsx

import React from 'react';
import { CONSTELLATIONS, StarPoint, Constellation } from './ConstellationLogic';

const DevelopConstellations: React.FC = () => {
  return (
    <div style={{ background: 'black', minHeight: '100vh', padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Constellation Develop View</h1>

      {CONSTELLATIONS.map((constellation: Constellation, index: number) => {
        const maxY = Math.max(...constellation.stars.map((s) => s.y));
        const viewHeight = Math.ceil(maxY + 10); // add 10% margin
        const pixelHeight = viewHeight * 10;     // scale: 1 unit = 10px

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
              {/* SVG for lines */}
              <svg
                viewBox={`0 0 100 ${viewHeight}`}
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0
                }}
              >
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
              </svg>

              {/* Stars */}
              {constellation.stars.map((star: StarPoint, i: number) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${(star.y / viewHeight) * 100}%`,
                    left: `${star.x}%`,
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px 2px white',
                    zIndex: 1
                  }}
                  title={`Star ${i + 1}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DevelopConstellations;
