// File: client/src/components/journal/DevelopConstellations.tsx

import React from 'react';
import { CONSTELLATIONS } from './ConstellationLogic';

const DevelopConstellations: React.FC = () => {
  return (
    <div style={{ background: 'black', minHeight: '100vh', padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Constellation Debug View</h1>

      {CONSTELLATIONS.map((constellation, index) => (
        <div key={index} style={{ marginBottom: '4rem', border: '1px solid #444', padding: '1rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{constellation.name}</h2>
          <div
            style={{
              position: 'relative',
              backgroundColor: '#000',
              height: '400px',
              width: '100%',
              border: '1px solid white',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            {constellation.stars.map((star, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${star.y}%`,
                  left: `${star.x}%`,
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px 2px white'
                }}
                title={`Star ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DevelopConstellations;
